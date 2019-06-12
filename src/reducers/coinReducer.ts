import { Reducer } from "redux";
import { ACTION_SET_COINS, ACTION_POPULATE_TOP_COINS, ACTION_SEARCH_TEXT, ACTION_SET_REFRESHING } from "../actions/coinActions";

export interface ICoinReducer {
  coins: any[];
  searchText: string;
};

const initialState: any = {
  coins: [],
  searchText: "",
  isRefreshing: true,
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

  }

  return state;
}

export default coinReducer;