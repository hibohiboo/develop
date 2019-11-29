import produce from "immer";
import { AddTodoAction } from "../../actions";
import { Reducer } from "redux";

interface Todo {
  id: number;
  text: string;
}

export interface State {
  todos: Todo[];
}

export function initialState(): State {
  return { todos: [] };
}

export const reducer: Reducer<State, AddTodoAction> = produce(
  (draft = initialState(), action) => {
    switch (action.type) {
      case "ADD_TODO":
        const { payload } = action;
        draft.todos.push(payload);
        return draft;
      default:
        return draft;
    }
  }
);
