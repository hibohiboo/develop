import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ADD = 'ADD_TODO';
export const TOGGLE = 'TOGGLE_TODO';
export const DELETE = 'DELETE_TODO';
export const EDITING = 'EDITING_TODO';
export const DONE_EDITING = 'DONE_EDITING_TODO';

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
export interface IEditingAction extends Action {
  type: 'EDITING_TODO';
  payload: {
    id: number;
  };
}
export interface IDoneEditingAction extends Action {
  type: 'EDITING_TODO';
  payload: {
    id: number;
    text: string;
  };
}
/**
 * actionを発行する関数。
 */
export const addTodo    = createAction(ADD,    (text: string) => ({ text }));
export const toggleTodo = createAction(TOGGLE, (id: number) => ({ id }));
export const deleteTodo = createAction(DELETE, (id: number) => ({ id }));
export const editingTodo = createAction(EDITING, (id: number) => ({ id }));
export const doneEditingTodo = createAction(DONE_EDITING, (id:number, text: string) =>({id, text}));