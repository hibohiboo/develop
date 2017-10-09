import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ADD = 'ADD_TODO';

/**
 * id保存用
 */
let nextTodoId = 0;

/**
 * actionを発行する関数。
 * actionは以下のオブジェクト
 * {
 *  type: 'ADD_TODO';
 *  payload: {
 *    id: number;
 *    text: string;
 *  }
 * }
 */
export const addTodo = createAction(ADD,
  // tslint:disable-next-line: no-increment-decrement
                                    text => ({ text, id: nextTodoId++ }),
);
