import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import coinReducer from "./reducers/coinReducer";

export default createStore(combineReducers({
  root: rootReducer,
  coin: coinReducer,
}),
applyMiddleware(thunk));