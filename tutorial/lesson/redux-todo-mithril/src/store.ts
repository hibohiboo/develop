import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import sagas from './sagas';

// Saga ミドルウェアを作成する
const sagaMiddleware = createSagaMiddleware();

// Store にマウントする
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, createLogger()),
);

// Saga を起動する
sagaMiddleware.run(sagas);
export default store;
