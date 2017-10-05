import { call, put, takeEvery } from 'redux-saga/effects';
import { FAILED, REQUEST, SUCCESS } from '../actions/tragedySet';
import { get as getSet } from '../browser/request';
import ITragedySetListItem from '../interfaces/ITragedySetListItem';

// ワーカー Saga: TRAGEDYSET_FETCH_REQUESTED Action によって起動する
function* fetchTragedySet(action: {type: string; payload: {url: string};}) {
  try {
    const tragedySetList: ITragedySetListItem[] = yield call(getSet, action.payload.url);
    yield put({ type: SUCCESS, payload:{ tragedySetList } });
  } catch (e) {
    yield put({ type: FAILED, message: e.message });
  }
}

/*
  TRAGEDYSET_FETCH_REQUESTED Action が送出されるたびに fetchTragedySet を起動します。
  ユーザ情報の並列取得にも対応しています。
*/
function* mySaga() {
  yield takeEvery(REQUEST, fetchTragedySet);
}

export default mySaga;
