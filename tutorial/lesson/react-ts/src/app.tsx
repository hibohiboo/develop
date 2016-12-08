import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import { createStore } from 'redux';
import todo from './reducers';
import { addTodo } from './actions'
let store = createStore(todo)

store.dispatch(addTodo('Hello World!'))
console.log(store.getState())
render(
  <Provider store={store}>
    <App />
  </Provider>,
  // reactのコンポーネントを#root以下に作成する
  document.getElementById('root')
);
