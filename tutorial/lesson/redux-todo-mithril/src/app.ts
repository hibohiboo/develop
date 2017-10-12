import * as m from 'mithril';
import App from './components/App';
import {createStore } from 'redux';
import { addTodo, toggleTodo } from './actions'
import { setVisibilityFilter, COMPLETED } from './actions/filter'
import reducers from './reducers';
import Provider from './mithril-redux';

const store = createStore(reducers);

store.dispatch(addTodo('Hello World!'));

const root = document.getElementById('app');

function render(){
  m.render(root, m(Provider,{ store }, m(App)));
}
render();
store.subscribe(render);