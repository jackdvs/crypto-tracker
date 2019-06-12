import { Reducer } from "redux";
import { ACTION_SET_COINS, ACTION_POPULATE_TOP_COINS, ACTION_SEARCH_TEXT } from "../actions/coinActions";

export interface ICoinReducer {
  coins: any[];
  searchText: string;
};

const initialState: any = {
  coins: [],
  searchText: "",
};


function coinReducer(state=initialState, action: any): Reducer {

  switch (action.type) {
    case ACTION_SET_COINS:
      return { ...state, coins: action.payload.coins }
    case ACTION_POPULATE_TOP_COINS:
      return { ...state, coins: action.payload.coins }
    case ACTION_SEARCH_TEXT:
      return { ...state, searchText: action.payload.searchText }

  }

  return state;
}

export default coinReducer;