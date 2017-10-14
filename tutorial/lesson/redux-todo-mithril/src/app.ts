import * as m from 'mithril';
import App from './components/App';
import {createStore } from 'redux';
import { addTodo, toggleTodo } from './actions/todos'
import { setVisibilityFilter, COMPLETED } from './actions/filter'
import {getRequsetTodoList, putRequsetTodoList } from './actions/storage';
import reducers from './reducers';
import Provider from './mithril-redux';
import store from './store';

const root = document.getElementById('app');

store.dispatch(getRequsetTodoList());

function render(){
  m.render(root, m(Provider,{ store }, m(App)));
}
render();
store.subscribe(render);