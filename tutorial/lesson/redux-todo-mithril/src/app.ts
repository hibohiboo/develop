import * as m from 'mithril';
import App from './components/App';
import {createStore } from 'redux';
import { addTodo, toggleTodo } from './actions'
import reducers from './reducers';
import Provider from './mithril-redux';

const store = createStore(reducers);

store.dispatch(addTodo('Hello World!'));
store.dispatch(toggleTodo(0));

const root = document.getElementById('app');

function render(){
  m.render(root, m(Provider,{ store }, m(App)));
}
render();
store.subscribe(render);
