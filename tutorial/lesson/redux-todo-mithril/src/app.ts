import * as m from 'mithril';
import App from './components/App';
import {createStore } from 'redux';
import { addTodo } from './actions'
import reducers from './reducers';
import Provider from './mithril-redux';

const todos = reducers;
const store = createStore(todos)

store.dispatch(addTodo('Hello World!'))
console.log(store.getState()) 

const root = document.getElementById('app');

m.mount(root, {view: ()=>m(Provider,{ store }, m(App))});
store.subscribe(m.redraw)