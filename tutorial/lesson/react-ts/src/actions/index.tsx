import { Action } from 'redux';

export type TodoActions = IAddTodoAction | IToggleTodoAction;

export interface IAddTodoAction extends Action {
    type: 'ADD_TODO';
    id: number;
    text: string;
}

export interface IToggleTodoAction extends Action {
    type: 'TOGGLE_TODO';
    id: number;
}

export interface IVisibilityFilter extends Action{
    type: 'SET_VISIBILITY_FILTER',
    filter: string
}

let nextTodoId:number = 0;

// actionを発行する関数
export function addTodo(text:string) : IAddTodoAction {
  // actionはtypeを持つオブジェクト
  // この場合、アクションタイプはADD_TODO
  // データはidとtextとなる。
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const toggleTodo = (id:number) : IToggleTodoAction => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

export const setVisibilityFilter = (filter:string) : IVisibilityFilter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}