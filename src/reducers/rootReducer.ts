import { Reducer, combineReducers } from "redux";
import { Alert } from "react-native";


export const ACTION_SET_TITLE: string = "ROOT_SET_TITLE";

export interface IRootReducer {
  title: string;
} 

const initialState: any = {
  title: "Crypto Tracker 2"
};

function rootReducer(state=initialState, action: any): Reducer {

  switch (action.type) {
    case ACTION_SET_TITLE:
      return { ...state, title: action.payload.title };
  }
  
  return state;
};

export default rootReducer;