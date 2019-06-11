import { Reducer } from "redux";
import { ACTION_SET_COINS, ACTION_POPULATE_TOP_COINS } from "../actions/coinActions";

export interface ICoinReducer {
  coins: any[];
};

const initialState: any = {
  coins: []
};


function coinReducer(state=initialState, action: any): Reducer {

  switch (action.type) {
    case ACTION_SET_COINS:
      return { ...state, coins: action.payload.coins }
    case ACTION_POPULATE_TOP_COINS:
      return { ...state, coins: action.payload.coins }
  }

  return state;
}

export default coinReducer;