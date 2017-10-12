import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ADD = 'ADD_TODO';
export const TOGGLE = 'TOGGLE_TODO';

export interface IAddTodoAction extends Action {
  type: 'ADD_TODO';
  payload: {
    id: number;
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
 * id保存用
 */
let nextTodoId = 0;

/**
 * actionを発行する関数。
 */
export const addTodo    = createAction(ADD,    (text: string) => ({ text, id: nextTodoId++ })); // tslint:disable-line: no-increment-decrement max-line-length
export const toggleTodo = createAction(TOGGLE, (id: number) => ({ id })); // tslint:disable-line: max-line-length
