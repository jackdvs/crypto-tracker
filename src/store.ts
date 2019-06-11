import { createStore, combineReducers } from "redux";
import rootReducer from "./reducers/rootReducer";
import coinReducer from "./reducers/coinReducer";

export default createStore(combineReducers({
  root: rootReducer,
  coin: coinReducer,
}));