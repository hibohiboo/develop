import { combineReducers } from "redux";
import * as Todos from "./todos";
export function initialState() {
  return {
    todos: Todos.initialState()
  };
}
export const reducer = combineReducers({ todos: Todos.reducer });
