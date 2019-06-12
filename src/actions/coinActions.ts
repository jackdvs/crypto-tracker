export const ACTION_SET_COINS: string = "ACTION_SET_COINS";
export const ACTION_POPULATE_TOP_COINS: string = "ACTION_POPULATE_TOP_COINS";
export const ACTION_SEARCH_TEXT: string = "ACTION_SEARCH_TEXT";
export const ACTION_SET_REFRESHING: string = "ACTION_SET_REFRESHING";
export const ACTION_SET_FAVOURITES: string = "ACTION_SET_FAVOURITES";

import axios, { AxiosResponse } from "axios";
import { Dispatch } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export function populateFavourites() {

  return async function (dispatch: Dispatch<any>) {

    const _favourites = await AsyncStorage.getItem("favourites");

    if (!_favourites) {
      await AsyncStorage.setItem("favourites", JSON.stringify([]));
    }

    const __favourites: any = await AsyncStorage.getItem("favourites");

    const favourites: string[] = JSON.parse(__favourites);

    dispatch({
      type: ACTION_SET_FAVOURITES,
      payload: {
        favourites: favourites,
      }
    })
  }

}

export function removeFromFavourites(coinName: string) {

  return async function (dispatch: Dispatch<any>) {

    const _favourites = await AsyncStorage.getItem("favourites");

    if (!_favourites) {
      await AsyncStorage.setItem("favourites", JSON.stringify([]));
    }

    const __favourites: any = await AsyncStorage.getItem("favourites");
    const favourites: string[] = JSON.parse(__favourites);
    const filtered = favourites.filter(name => name !== coinName);
    await AsyncStorage.setItem("favourites", JSON.stringify(filtered));

    dispatch({
      type: ACTION_SET_FAVOURITES,
      payload: {
        favourites: filtered,
      },
    });

  }

}

export function searchCoin(coinName: string) {
  return {
    type: ACTION_SEARCH_TEXT,
    payload: {
      searchText: coinName
    }
  }
}

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

      await dispatch({
        type: ACTION_SET_REFRESHING,
        payload: {
          isRefreshing: true,
        }
      });

      const url: string = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&order=market_cap_desc"
      const res: AxiosResponse = await axios.get(url);

      // get coins from db here
      const coins: any[] = res.data;

      await dispatch({
        type: ACTION_POPULATE_TOP_COINS,
        payload: {
          coins,
        }
      });

      await dispatch({
        type: ACTION_SET_REFRESHING,
        payload: {
          isRefreshing: false,
        }
      })

    }
    catch (err) { }
    
  }

}