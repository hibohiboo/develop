import * as m from 'mithril';
import * as page from 'page';
import App from './components/App';
import {createStore } from 'redux';
import { toggleTodo } from './actions/todos'
import { setVisibilityFilter } from './actions/filter'
import {getRequsetTodoList, putRequsetTodoList } from './actions/storage';
import reducers from './reducers';
import Provider from './mithril-redux';
import store from './store';

const root = document.getElementById('app');

store.dispatch(getRequsetTodoList());

function render(){
  m.render(root, m(Provider,{ store }, m(App)));
}

page('/', (ctx)=>{
  if(ctx.hash){
    store.dispatch(setVisibilityFilter(ctx.hash));
  }
});
page();
store.subscribe(render);