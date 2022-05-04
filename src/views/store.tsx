import { Store } from 'react-stores';
import * as nearAPI from 'near-api-js';

const baseUrl = 'file:///home/lev/code/18500/18500-Final';
export const defaultRedirectUrl = `${baseUrl}/build/index.html`;

export const SESSION_STARTED = 'sessionStarted'
export const SESSION_ENDED = 'sessionEnded'

export interface IMyStoreState {
  wallet: nearAPI.WalletConnection | null;
  contract: nearAPI.Contract | null;
}

export const myStore = new Store<IMyStoreState>({
  wallet: null, // initial state values
  contract: null,
});
