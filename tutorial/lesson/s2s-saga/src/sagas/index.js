import { all } from "redux-saga/effects";
import coin from "./coin";
export default function* rootSaga() {
  yield all([...coin]);
}
