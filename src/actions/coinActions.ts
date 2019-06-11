export const ACTION_SET_COINS: string = "ACTION_SET_COINS";
export const ACTION_POPULATE_TOP_COINS: string = "ACTION_POPULATE_TOP_COINS";

import axios, { AxiosResponse } from "axios";
import { Dispatch } from "react";


export interface ICoinDispatch {
  setCoins: (payload: any) => void,
  populateTopCoins: () => void,
};

export function setCoins(payload: any) {
  return {
    type: ACTION_SET_COINS,
    payload: {
      coins: payload.coins,
    }
  }
}

export function populateTopCoins() {
  
  return async function (dispatch: Dispatch<any>) {
    
    try {

      const url: string = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&order=market_cap_desc"
      const res: AxiosResponse = await axios.get(url);

      // get coins from db here
      const coins: any[] = res.data;

      dispatch({
        type: ACTION_POPULATE_TOP_COINS,
        payload: {
          coins,
        }
      });

    }
    catch (err) { }
    
  }

}