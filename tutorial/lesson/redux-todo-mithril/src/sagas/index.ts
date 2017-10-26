import { takeEvery } from 'redux-saga/effects';
import { GET_REQUEST, PUT_REQUEST } from '../actions/storage';
import { ADD, TOGGLE, DELETE } from '../actions/todos';
import { ALL_COMPLETED, ALL_INCOMPLETED,
         allCompletedTodoList, allIncompletedTodoList } from '../modules/allCompoeted';
import { addTodoList, getTodoList, putTodoList, toggleTodo, deleteTodo } from './todos';

function* mySaga() {
  yield takeEvery(ADD, addTodoList);
  yield takeEvery(TOGGLE, toggleTodo);
  yield takeEvery(DELETE, deleteTodo);
  yield takeEvery(GET_REQUEST, getTodoList);
  yield takeEvery(PUT_REQUEST, putTodoList);
  yield takeEvery(ALL_COMPLETED, allCompletedTodoList);
  yield takeEvery(ALL_INCOMPLETED, allIncompletedTodoList);
}

export default mySaga;
