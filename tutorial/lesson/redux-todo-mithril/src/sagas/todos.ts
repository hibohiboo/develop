import { call, put, select, takeEvery } from 'redux-saga/effects';
import { GET_FAILED, GET_REQUEST, GET_SUCCESS,
         PUT_FAILED, PUT_REQUEST, PUT_SUCCESS } from '../actions/storage';
import { get as getTodo, put as putTodo } from '../browser/storage';
import TodoState from '../models/TodoState';

// ワーカー Saga:GET_REQUEST Action によって起動する
export function* addTodoList(action: {type: string, payload: {text}}) {
  const todos = yield select((state: any) => state.todos);
  const { text } = action.payload;
  const todoList = [...todos, new TodoState({ text })];
  yield put({ type: PUT_REQUEST, payload:{ todoList } });
}

export function* toggleTodo(action: {type: string, payload: {id}}) {
  const todos = yield select((state: any) => state.todos);
  const { id } = action.payload;
  const todoList = todos.map((t) => {
    // actionCreatorに渡したidと一致するtodoのみ処理
    if (t.id !== id) {
      return t;
    }
    // completedだけを反転
    return  new TodoState({ id:t.id, text:t.text, completed: !t.completed });
  });
  yield put({ type: PUT_REQUEST, payload:{ todoList } });
}

// ワーカー Saga:PUT_REQUEST Action によって起動する
export function* putTodoList(action: {type: string, payload: {todoList: TodoState[]}}) {
  try {
    yield call(putTodo, action.payload.todoList);
    yield put({ type: PUT_SUCCESS, payload:{ todoList: action.payload.todoList } });
  } catch (e) {
    yield put({ type: PUT_FAILED, message: e.message });
  }
}

// ワーカー Saga:GET_REQUEST Action によって起動する
export function* getTodoList(action: {type: string;}) {
  try {
    const todoList: TodoState[] = yield call(getTodo);
    yield put({ type: GET_SUCCESS, payload:{ todoList } });
  } catch (e) {
    yield put({ type: GET_FAILED, message: e.message });
  }
}
