import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import coin from "./coin";
export default combineReducers({
  coin,
  routing: routerReducer
});
