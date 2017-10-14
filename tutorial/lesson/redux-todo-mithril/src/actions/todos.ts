import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ADD = 'ADD_TODO';
export const TOGGLE = 'TOGGLE_TODO';

export interface IAddTodoAction extends Action {
  type: 'ADD_TODO';
  payload: {
    text: string;
  };
}
export interface IToggleTodoAction extends Action {
  type: 'TOGGLE_TODO';
  payload: {
    id: number;
  };
}

/**
 * actionを発行する関数。
 */
export const addTodo    = createAction(ADD,    (text: string) => ({ text }));
export const toggleTodo = createAction(TOGGLE, (id: number) => ({ id }));
