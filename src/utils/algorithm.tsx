import { createReadStream, readFileSync } from 'original-fs';
import csv from 'csv-parser';

const TWO_CRITERIA_FAILURE_CONTINOUS_TIME_MS = 30 * 1000;
const SINGLE_CRITERIA_FAILURE_MS = 6.25 * 60 * 1000;

const SOUND_INCR_FAILURE_DB = 10;
const ACCELERATION_FAILURE_DIFF = 0.2;
const HR_INCR_PROP_FAILURE = 1.4;

interface Data {
  time: number;
  aX: number;
  aY: number;
  aZ: number;
  soundDB: number;
  hr: number;
}

// createReadStream('data.csv').pipe(csv()).on(
const readCSV = (): Promise<Data[]> => {
  const rows = [];
  console.log('AAA');
  return new Promise((res, rej) => {
    createReadStream('data.csv')
      .pipe(csv())
      .on('data', (row: Data) => {
        rows.push(row);
      })
      .on('end', () => {
        const sortedRows = rows.sort((a, b) => a.time - b.time);

        res(sortedRows);
      });
  });
};

const failForRows = (
  rowsWithinTime: Data[],
  initSoundDB: number,
  initHR: number
) => {
  // Discard the first time as it used for differencing

  const failedPerTime = rowsWithinTime.slice(1).map((row, i) => {
    const previousRow = rowsWithinTime[i];
    const accelerationDiffMag = Math.sqrt(
      Math.pow(row.aX - previousRow.aX, 2) +
        Math.pow(row.aY - previousRow.aY, 2) +
        Math.pow(row.aZ - previousRow.aZ, 1)
    );
    return {
      accelFailed: accelerationDiffMag > ACCELERATION_FAILURE_DIFF,
      hrFailed: row.hr / initHR > HR_INCR_PROP_FAILURE,
      soundFailed: row.soundDB - initSoundDB > SOUND_INCR_FAILURE_DB,
      time: row.time,
    };
  });

  const getTotalTimeFailed = (criteria: string) => {
    return failedPerTime
      .slice(0, failedPerTime.length - 1)
      .reduce((accum, time, i) => {
        if (time[criteria]) {
          return accum + (failedPerTime[i + 1].time - time.time);
        }
        return accum;
      }, 0);
  };

  // Check for single criteria failure
  if (
    getTotalTimeFailed('accelFailed') > SINGLE_CRITERIA_FAILURE_MS ||
    getTotalTimeFailed('hrFailed') > SINGLE_CRITERIA_FAILURE_MS ||
    getTotalTimeFailed('soundFailed') > SINGLE_CRITERIA_FAILURE_MS
  ) {
    return false;
  }

  const boolToInt = (b) => (b ? 1 : 0);

  // Check for double criteria failure
  const { maxFailed } = failedPerTime.slice(0, failedPerTime.length - 1).reduce(
    (accum, time, i) => {
      const numbFailed =
        boolToInt(time.accelFailed) +
        boolToInt(time.hrFailed) +
        boolToInt(time.soundFailed);

      if (numbFailed >= 2) {
        const currentFailed =
          accum.current + (failedPerTime[i + 1].time - time.time);
        console.log('More than 2 failed', currentFailed);
        const maxFailed = Math.max(currentFailed, accum.maxFailed);
        return {
          maxFailed,
          current: currentFailed,
        };
      } else {
        return {
          maxFailed: accum.maxFailed,
          current: 0,
        };
      }
    },
    { maxFailed: 0, current: 0 }
  );

  console.log(maxFailed, 'aaa');

  return maxFailed < TWO_CRITERIA_FAILURE_CONTINOUS_TIME_MS;
};

export const calculateFocusScore = async (
  timeStart: number,
  timeEnd: number
): Promise<boolean> => {
  const rows = await readCSV();
  const rowsWithinTime = rows.filter((r) => {
    return r.time >= timeStart && r.time <= timeEnd;
  });

  return failForRows(
    rowsWithinTime,
    rowsWithinTime[0].soundDB,
    rowsWithinTime[0].hr
  );
};
