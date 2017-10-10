import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ADD = 'ADD_TODO';

/**
 *
 *
 * @export
 * @interface IAddTodoAction
 */
export interface IAddTodoAction extends Action {
  type: 'ADD_TODO';
  payload: {
    id: number;
    text: string;
  };
}

/**
 * id保存用
 */
let nextTodoId = 0;

/**
 * actionを発行する関数。
 */
export const addTodo = createAction(ADD,
                                    // tslint:disable-next-line: no-increment-decrement
                                    (text: string) => ({ text, id: nextTodoId++ }),
);
