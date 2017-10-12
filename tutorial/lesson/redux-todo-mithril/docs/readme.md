# MithrilのTodo ListをはじめからていねいにTypescriptで(2)

## 1. 完了・未完了を表すcompletedによってスタイルを変える

テスト用に completed = trueとしている。

```ts:src/models/TodoState.ts
export default class TodoState {
  constructor(
    public id: number,
    public text: string,
    public completed: boolean = true // TODO:  true -> false
  ) {}
}
```

```ts:src/components/Todo.tsx
import { ClassComponent, Vnode } from 'mithril'; 
import * as m from 'mithril';

interface IAttr {
  text: string;
  completed: boolean ;
}

export default class Todo implements  ClassComponent<IAttr> {
  public view(vnode: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    const { text, completed } = vnode.attrs;
    return (
    <li style = {{textDecoration: completed ? 'line-through' : 'none'}}>
      {text}
    </li>);
  }
}
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/1c332b4454421f5d7e2f44ce12a430708b4c8050/tutorial/lesson/redux-todo-mithril)


### actionCreatorからcompleted要素を操作する

```ts:src/actions/index.ts
import { Action } from 'redux';
import { createAction } from 'redux-actions';
export const ADD = 'ADD_TODO';
export const TOGGLE = 'TOGGLE_TODO';
export interface IAddTodoAction extends Action {
  type: 'ADD_TODO';
  payload: {
    id: number;
    text: string;
  };
}
export interface IToggleTodoAction extends Action {
  type: 'TOGGLE_TODO';
  payload: {
    id: number;
  };
}
let nextTodoId = 0;
export const addTodo    = createAction(ADD,    (text: string) => ({ text, id: nextTodoId++ }));
export const toggleTodo = createAction(TOGGLE, (id: number) => ({ id }));
```


```ts:src/reducers/todos.ts
import { handleActions } from 'redux-actions';
import { ADD, IAddTodoAction, IToggleTodoAction, TOGGLE } from '../actions';
import TodoState from '../models/TodoState';

export default handleActions({
  [ADD]: (state: TodoState[],  { payload }: IAddTodoAction) => {
    return [...state, new TodoState(payload.id, payload.text)];
  },
  [TOGGLE]: (state: TodoState[], { payload }: IToggleTodoAction) => {
    const { id } = payload;
    return state.map((t) => {
      // actionCreatorに渡したidと一致するtodoのみ処理
      if (t.id !== id) {
        return t;
      }
      // completedだけを反転
      return  new TodoState(t.id, t.text, !t.completed);
    });
  },
},                           []);
```
#### 確認

```ts:src/app.ts
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
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/4e058b4040b39f3ddbb786170b81dcabe91f14e3/tutorial/lesson/redux-todo-mithril)

## 2. クリックしてcompletedの値を変える

```ts:src/containers/VisibleTodoList.tsx
import TodoList from '../components/TodoList';
import { connect } from '../mithril-redux';
import TodoState from '../models/TodoState';
import { toggleTodo } from '../actions';
interface IStateToProps { todos: TodoState[]; }
interface IDispatchToProps{ onTodoClick: Function; }
const mapStateToProps = (store): IStateToProps => {
  return { todos: store.todos };
};
const mapDispatchToProps = (dispatch:Function):IDispatchToProps => {
  return {
    onTodoClick: (id:number) => {
      dispatch(toggleTodo(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

```ts:src/components/TodoList.tsx
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril';
import TodoState from '../models/TodoState';
import Todo from './Todo';
interface IAttr {
  props: {
    todos: TodoState[];
    onTodoClick: (id: number) => void;
  };
}
export default class TodoList implements  ClassComponent<IAttr> {
  public view({ attrs:{ props } }: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    const { todos, onTodoClick } = props;
    return (
<ul>
  {todos.map(todo => <Todo {...todo} onClick={() => {onTodoClick(todo.id);}} />)}
</ul>);
  }
}
```

```ts:src/components/Todo.tsx
import { ClassComponent, Vnode } from 'mithril';
import * as m from 'mithril';
interface IAttr {
  text: string;
  completed: boolean;
  onClick: (id: number) => void;
}
export default class Todo implements  ClassComponent<IAttr> {
  public view({ attrs }: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    const { text, completed, onClick } = attrs;
    return (
    <li
      onclick={onClick}
      style = {{ textDecoration: completed ? 'line-through' : 'none' }}>
      {text}
    </li>);
  }
}
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/268bb6aec371f212db7be66af945dff809607273/tutorial/lesson/redux-todo-mithril)

## 3.  actionCreatorとreducerでフィルターの値をstore(state)に格納

### actionCreatorの作成

```ts:src/actions/filter.ts
import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const SET_VISIBILITY = 'SET_VISIBILITY_FILTER';
export const ALL = 'SHOW_ALL';
export const COMPLETED = 'SHOW_COMPLETED';
export const ACTIVE = 'SHOW_ACTIVE';

export type VisibilityFilterType = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE';

export interface IVisibilityFilter extends Action {
  type: 'SET_VISIBILITY_FILTER';
  payload: {
    filter: VisibilityFilterType;
  };
}
export const setVisibilityFilter = createAction(SET_VISIBILITY, (filter: VisibilityFilterType) => ({ filter }));
```

```ts:src/reducers/visibilityFilter.ts
import { handleActions } from 'redux-actions';
import { ALL, IVisibilityFilter, SET_VISIBILITY } from '../actions/filter';

export default handleActions({
  [SET_VISIBILITY]: (state, { payload:{ filter } }: IVisibilityFilter) => {
    return filter;
  },
},                           ALL);
```

```ts:src/reducers/index.ts
import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
export default combineReducers({
  todos, visibilityFilter,
});
```

#### 確認

```ts:src/app.ts
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
console.log(store.getState()) // => Object {todos: Array[0], visibilityFilter: "SHOW_ALL"}
store.dispatch(setVisibilityFilter(COMPLETED))
console.log(store.getState()) // => Object {todos: Array[0], visibilityFilter: "SHOW_COMPLETED"}
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/ad36e166cf642646f9aa69c9f0b481d9f184476c/tutorial/lesson/redux-todo-mithril)

## 4. フィルターの値によってviewを変更（手動でフィルターを操作して動作確認）
```ts
import { toggleTodo } from '../actions';
import { VisibilityFilterType } from '../actions/filter';
import TodoList from '../components/TodoList';
import { connect } from '../mithril-redux';
import TodoState from '../models/TodoState';

interface IStateToProps {
  todos: TodoState[];
}
interface IDispatchToProps { onTodoClick: (id: number) => void;}
const getVisibleTodos = (todos: TodoState[], filter:VisibilityFilterType):TodoState[] => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter((t) => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter((t) => !t.completed)
  }
}

const mapStateToProps = (store): IStateToProps => {
  return { todos: getVisibleTodos(store.todos, store.visibilityFilter) };
};
const mapDispatchToProps = (dispatch): IDispatchToProps => {
  return {
    onTodoClick: (id: number) => {
      dispatch(toggleTodo(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/96e1f44fd04f288668e6843a0738b269529d0612/tutorial/lesson/redux-todo-mithril)

## 5. リンクをクリックしてフィルターを操作してviewを変更

### とりあえずリンク

```ts:src/components/Link.tsx
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril';  // tslint:disable-line: no-duplicate-imports
interface IAttr {}
export default class Link implements  ClassComponent<IAttr> {
  view({children}: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    return (<a href="#">{children}</a>);
  }
}
```

```ts:src/components/Footer.tsx
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril';  // tslint:disable-line: no-duplicate-imports
import Link from './Link';

interface IAttr {}

export default class Footer implements  ClassComponent<IAttr> {
  view({children}: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    return (
      <p>
      Show:
      {" "}
      <Link>
        All
      </Link>
      {", "}
      <Link>
        Active
      </Link>
      {", "}
      <Link>
        Completed
      </Link>
    </p>

    );
  }
}
```

```ts:src/components/App.tsx
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril';  // tslint:disable-line: no-duplicate-imports
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';
interface IAttr {}
export default class App implements  ClassComponent<IAttr> {
  view(vnode: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    return (
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>);
  }
}
```


