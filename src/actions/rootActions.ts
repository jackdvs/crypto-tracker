import { ACTION_SET_TITLE } from "../reducers/rootReducer";
import { Alert } from "react-native";

export interface IRootDispatch {
  setTitle: (payload: any) => void,
};

export function setTitle(payload: any) {
  return {
    type: ACTION_SET_TITLE,
    payload: {
      title: payload.title,
    }
  }
}



