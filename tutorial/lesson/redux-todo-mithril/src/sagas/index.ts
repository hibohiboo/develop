import { takeEvery } from 'redux-saga/effects';
import { GET_REQUEST, PUT_REQUEST } from '../actions/storage';
import { ADD, TOGGLE } from '../actions/todos';
import { addTodoList, getTodoList, putTodoList, toggleTodo } from './todos';

function* mySaga() {
  yield takeEvery(ADD, addTodoList);
  yield takeEvery(TOGGLE, toggleTodo);
  yield takeEvery(GET_REQUEST, getTodoList);
  yield takeEvery(PUT_REQUEST, putTodoList);
}

export default mySaga;
