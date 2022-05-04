import { createReadStream, readFileSync } from 'original-fs';
import csv from 'csv-parser';

// const TWO_CRITERIA_FAILURE_CONTINOUS_TIME_MS = 10;
// const SINGLE_CRITERIA_FAILURE_MS = 10; //6.25 * 60 * 1000;
const TWO_CRITERIA_FAILURE_FRAC = 1 / 100;
const SINGLE_CRITERIA_FAILURE_FRAC = 3 / 100;
const DELAY_TIME = 1000;

const SOUND_INCR_FAILURE_DB = 5;
const ACCELERATION_FAILURE_DIFF = 0.2;
const HR_INCR_PROP_FAILURE = 1.4;

interface IRet {
  success: boolean;
  criteriaFailed: string[];
}

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
  initHR: number,
  initIndex: number,
  allData: Data[],
  totalTimeMs: number
): IRet => {
  // Discard the first time as it used for differencing

  const failedPerTime = rowsWithinTime.map((row, i) => {
    const previousRow = allData[initIndex + i - 1];
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
  console.log(failedPerTime);

  const getTotalTimeFailed = (criteria: string) => {
    return failedPerTime.reduce((accum, time, i) => {
      if (time[criteria]) {
        return accum + DELAY_TIME;
      }
      return accum;
    }, 0);
  };

  // TODO: j change alg to "count"
  const tA = getTotalTimeFailed('accelFailed');
  const singleAccelF = tA > SINGLE_CRITERIA_FAILURE_FRAC * totalTimeMs;
  const tHR = getTotalTimeFailed('hrFailed');
  const singleHrF = tHR > SINGLE_CRITERIA_FAILURE_FRAC * totalTimeMs;
  const tS = getTotalTimeFailed('soundFailed');
  const singleSoundFailed = tS > SINGLE_CRITERIA_FAILURE_FRAC * totalTimeMs;
  // Check for single criteria failure
  if (singleAccelF || singleHrF || singleSoundFailed) {
    console.log('FAIL');
    const critFail = [];
    if (singleAccelF) critFail.push('movement');
    if (singleHrF) critFail.push('heart rate');
    if (singleSoundFailed) critFail.push('sound level');
    return {
      success: false,
      criteriaFailed: critFail,
    };
  }

  const boolToInt = (b) => (b ? 1 : 0);

  // Check for double criteria failure
  const { maxFailed } = failedPerTime.slice(0, failedPerTime.length - 1).reduce(
    (accum, time, i) => {
      const numbFailed =
        boolToInt(time.accelFailed) +
        boolToInt(time.hrFailed) +
        boolToInt(time.soundFailed);

      console.log(time.accelFailed, time.hrFailed, time.soundFailed);
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

  const success = maxFailed < TWO_CRITERIA_FAILURE_FRAC * totalTimeMs;
  let critFailed = [];

  if (tS < tA && tS < tHR) {
    critFailed = ['movement', 'heart rate'];
  } else if (tA < tS && tA < tHR) {
    critFailed = ['heart rate', 'sound level'];
  } else {
    critFailed = ['movement', 'sound level'];
  }

  return {
    success,
    criteriaFailed: critFailed,
  };
};

export const calculateIsFocused = async (
  timeStartMillis: number,
  timeEndMillis: number
): Promise<IRet> => {
  const rows = await readCSV();
  let initIdx = -1;
  const rowsWithinTime = rows.filter((r, i) => {
    if (
      initIdx === -1 &&
      r.time >= timeStartMillis &&
      r.time <= timeEndMillis
    ) {
      initIdx = i;
    }
    return r.time >= timeStartMillis && r.time <= timeEndMillis;
  });
  if (!rowsWithinTime[0]) return { success: true, criteriaFailed: [] };

  return failForRows(
    rowsWithinTime,
    rowsWithinTime[0].soundDB,
    80, // TODO: change?
    initIdx,
    rows,
    timeEndMillis - timeStartMillis
  );
};
