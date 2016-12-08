import { Action } from 'redux';

export interface AddTodoAction extends Action {
    type: 'ADD_TODO';
    id: number;
    text: string;
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