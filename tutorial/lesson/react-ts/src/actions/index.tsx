import { Action } from 'redux';

export type Actions = AddTodoAction | ToggleTodoAction;

export interface AddTodoAction extends Action {
    type: 'ADD_TODO';
    id: number;
    text: string;
}

export interface ToggleTodoAction extends Action {
    type: 'TOGGLE_TODO';
    id: number;
}

let nextTodoId:number = 0;

// actionを発行する関数
export function addTodo(text:string) : AddTodoAction {
  // actionはtypeを持つオブジェクト
  // この場合、アクションタイプはADD_TODO
  // データはidとtextとなる。
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const toggleTodo = (id:number) : ToggleTodoAction => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}