import { takeEvery } from 'redux-saga/effects';
import { ALL_COMPLETED, ALL_INCOMPLETED,
         allCompletedTodoList, allIncompletedTodoList } from '../modules/allCompoeted';
import todos from './todos';

function* mySaga() {
  yield takeEvery(ALL_COMPLETED, allCompletedTodoList);
  yield takeEvery(ALL_INCOMPLETED, allIncompletedTodoList);
  yield todos();
}

export default mySaga;
