import { ACTION_SET_TITLE } from "../reducers/rootReducer";


export function setTitle(payload: any) {
  return {
    type: ACTION_SET_TITLE,
    payload: {
      title: payload.title,
    }
  }
}



