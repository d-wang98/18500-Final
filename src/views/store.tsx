import { Store } from 'react-stores';
import * as nearAPI from 'near-api-js';

export interface IMyStoreState {
  wallet: nearAPI.WalletConnection | null;
  contract: nearAPI.Contract | null;
};


export const myStore = new Store<IMyStoreState>({
  wallet: null, // initial state values
  contract: null,
});