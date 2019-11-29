import { createStore, Store } from "redux";
import { initialState, reducer } from "./reducers";
export type StoreState = ReturnType<typeof initialState>;
export type ReduxStoreInstance = Store<StoreState>;

export function initStore(state = initialState()) {
  // createStoreの引数が1つだと初期値がなくてエラーとなる
  return createStore(reducer, state);
}
