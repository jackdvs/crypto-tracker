import { Reducer } from "redux";
import { ACTION_SET_COINS, ACTION_POPULATE_TOP_COINS, ACTION_SEARCH_TEXT, ACTION_SET_REFRESHING, ACTION_SET_FAVOURITES, ACTION_SET_SELECTED_COIN_DETAILS, ACTION_SET_COIN_LOADING } from "../actions/coinActions";
import { ICoinInfo } from "../screens/CoinDetails/ICoinInfo";

export interface ICoinReducer {
  coins: any[];
  searchText: string;
  isRefreshing: boolean;
  favourites: string[],
  selectedCoinInfo: ICoinInfo;
};

const initialState: any = {
  coins: [],
  searchText: "",
  isRefreshing: true,
  favourites: [],
  selectedCoinInfo: {},
  isCoinInfoLoading: true,
};


function coinReducer(state=initialState, action: any): Reducer {

  switch (action.type) {
    case ACTION_SET_COINS:
      return { ...state, coins: action.payload.coins }
    case ACTION_POPULATE_TOP_COINS:
      return { ...state, coins: action.payload.coins, }
    case ACTION_SEARCH_TEXT:
      return { ...state, searchText: action.payload.searchText }
    case ACTION_SET_REFRESHING:
      return { ...state, isRefreshing: action.payload.isRefreshing }
    case ACTION_SET_FAVOURITES:
      return { ...state, favourites: action.payload.favourites }
    case ACTION_SET_SELECTED_COIN_DETAILS:
      return { ...state, selectedCoinInfo: action.payload.selectedCoinInfo }
    case ACTION_SET_COIN_LOADING:
      return { ...state, isCoinInfoLoading: action.payload.isCoinInfoLoading }

  }

  return state;
}

export default coinReducer;