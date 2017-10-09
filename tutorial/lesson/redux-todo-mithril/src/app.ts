import * as m from 'mithril';
import App from './components/App';
import {createStore } from 'redux';
import { addTodo } from './actions'
import reducers from './reducers';
const store = createStore(reducers)

store.dispatch(addTodo('Hello World!'))
console.log(store.getState()) 

const root = document.getElementById('app');
m.render(root, m(App));
