import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { PUT_REQUEST } from '../actions/storage';
import TodoState from '../models/TodoState';

// ducks
// カテゴリごとに reducer, saga, actionType および actionCreator などを全部1つにまとめてしまう

/**
 * actionType
 */
export const ALL_COMPLETED = 'ALL_COMPLETED';
export const ALL_INCOMPLETED = 'ALL_INCOMPLETED';

/**
 * actionを発行
 */
export const allCompleted   = createAction(ALL_COMPLETED);
export const allIncompleted = createAction(ALL_INCOMPLETED);

// Saga:ALL_COMPLETED Action によって起動するワーカー
function* toggleCompletedTodoList(completed: boolean) {
  const todos: TodoState[] = yield select((state: {todos: TodoState[]}) => state.todos);
  const todoList = todos.map((todo) => {todo.completed = completed; return todo;});
  yield put({ type: PUT_REQUEST, payload:{ todoList } });
}
export function* allCompletedTodoList(action: { type: string }) {
  yield toggleCompletedTodoList(true);
}

export function* allIncompletedTodoList(action: { type: string }) {
  yield toggleCompletedTodoList(false);
}
