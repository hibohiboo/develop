# Mithril + Redux のTodo ListをTypescriptで(2)

[前回](https://qiita.com/hibohiboo/items/335ba837425978eb5f4a)の続き。
MithrilのTodoMVCをReduxで再現したメモ。

## completeの切り替えをinputにする。

[todomvc-common][*2]と[todomvc-app-css][*3]からcssを引用。

```html:public/index.html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>Todosサンプル</title>
  <link rel="stylesheet" href="style.css">
  <script src="assets/js/vendor.mithril.js"></script>
</head>
<body>
  <h1>Todosサンプル</h1>
  <div id="app"></div>
  <script src="assets/js/todo.mithril.js"></script>
</body>
</html>
```

```css:public/style.css
#todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}
```

```ts:src/components/TOdoList.ts
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
<ul id="todo-list">
  {todos.map(todo => <Todo {...todo} onClick={() => {onTodoClick(todo.id);}} />)}
</ul>);
  }
}
```

```ts:src/components/Todo.tsx
import { ClassComponent, Vnode } from 'mithril';
import * as m from 'mithril'; // tslint:disable-line: no-duplicate-imports

interface IAttr {
  text: string;
  completed: boolean;
  onClick: (id: number) => void;
}
export default class Todo implements  ClassComponent<IAttr> {
  public view({ attrs }: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    const { text, completed, onClick } = attrs;
    let classes = completed ? 'completed' : '';
    return (
    <li class={classes}>
      <input class="toggle" type="checkbox" onclick={onClick} checked={completed} />
      <label>{text}</label>
    </li>);
  }
}
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/8f44d7ce20881ba57e2b8dc89e4517d15bf08066/tutorial/lesson/redux-todo-mithril)

## すべてのチェックボックスのオンオフを切り替えるチェックボックスを作成する。

### すべてのチェックボックスがオンの時にチェックが入るチェックボックスを作成

```ts:src/containers/AllCompleted.tsx
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril'; // tslint:disable-line: no-duplicate-imports
import { addTodo } from '../actions/todos';
import { connect } from '../mithril-redux';
import TodoState from '../models/TodoState';
interface IAttr {
  props: {
    completed: boolean;
  };
}
const mapStateToProps = (store: {todos: TodoState[]}): {completed: boolean} => {
  return { completed: store.todos.every(todo => todo.completed) };
};
class AllCompleted implements  ClassComponent<IAttr> {
  public view(vnode: Vnode<IAttr, {}>) {
    const { completed } = vnode.attrs.props;
    return (
      <input class="toggle" type="checkbox" checked={completed} />
    );
  }
}
export default connect(mapStateToProps, null)(AllCompleted);
```

```ts:src/components/App.tsx
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril';  // tslint:disable-line: no-duplicate-imports
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';
import AllCompleted from '../containers/AllCompleted';
interface IAttr {}
export default class App implements  ClassComponent<IAttr> {
  public view(vnode: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    return (
    <div>
      <AddTodo />
      <label> check all: <AllCompleted /> </label>
      <VisibleTodoList />
      <Footer />
    </div>);
  }
}
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/b96959f1e9baff65f3ef304b5ec69f05e3602ae1/tutorial/lesson/redux-todo-mithril)

### アクションを作成。

action や sagaをまとめた ducksパターンを使用してみる。

```ts:src/ducks/allComplete.ts
import { Action } from 'redux';
import { createAction } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { PUT_REQUEST } from '../actions/storage';
import TodoState from '../models/TodoState';

export const ALL_COMPLETED = 'ALL_COMPLETED';
export const ALL_INCOMPLETED = 'ALL_INCOMPLETED';

export const allCompleted    = createAction(ALL_COMPLETED);
export const allIncompleted = createAction(ALL_INCOMPLETED);

function* toggleCompletedTodoList(completed:boolean){
  const todos: TodoState[] = yield select((state: {todos: TodoState[]}) => state.todos);
  const todoList = todos.map((todo) => {todo.completed = completed; return todo;});
  yield put({ type: PUT_REQUEST, payload:{ todoList } });
}
export function* allCompletedTodoList(action: { type: string }) {
  yield toggleCompletedTodoList(true);
}
export function* allIncompletedTodoList(action: { type: string }) {
  yield toggleCompletedTodoList(false);
}
```

```ts:src/sagas/index.ts
import { takeEvery } from 'redux-saga/effects';
import { GET_REQUEST, PUT_REQUEST } from '../actions/storage';
import { ADD, TOGGLE } from '../actions/todos';
import { ALL_COMPLETED, ALL_INCOMPLETED,
         allCompletedTodoList, allIncompletedTodoList } from '../ducks/allCompoeted';
import { addTodoList, getTodoList, putTodoList, toggleTodo } from './todos';

function* mySaga() {
  yield takeEvery(ADD, addTodoList);
  yield takeEvery(TOGGLE, toggleTodo);
  yield takeEvery(GET_REQUEST, getTodoList);
  yield takeEvery(PUT_REQUEST, putTodoList);
  yield takeEvery(ALL_COMPLETED, allCompletedTodoList);
  yield takeEvery(ALL_INCOMPLETED, allIncompletedTodoList);
}

export default mySaga;
```

```ts:src/containers/AllCompleted.tsx
import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril'; // tslint:disable-line: no-duplicate-imports
import { allCompleted, allIncompleted } from '../ducks/allCompoeted';
import { connect } from '../mithril-redux';
import TodoState from '../models/TodoState';
interface IAttr {
  props: {
    completed: boolean;
    onClick: (completed: boolean) => void;
  };
}
const mapStateToProps = (store: {todos: TodoState[]}): {completed: boolean} => {
  return { completed: store.todos.every(todo => todo.completed) };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (completed: boolean) => {
      if (completed) {
        dispatch(allIncompleted());
        return;
      }
      dispatch(allCompleted());
    },
  };
};
class AllCompleted implements  ClassComponent<IAttr> {
  public view(vnode: Vnode<IAttr, {}>) {
    const { completed, onClick } = vnode.attrs.props;
    return (
      <input class="toggle"
             type="checkbox"
             onclick={() => onClick(completed)}
             checked={completed} />
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllCompleted);
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/67f2a08ebe812be34135c142eb004c8c78bef014/tutorial/lesson/redux-todo-mithril)


## 削除ボタンを作成する。

```ts:src/actions/todos.ts
import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ADD = 'ADD_TODO';
export const TOGGLE = 'TOGGLE_TODO';
export const DELETE = 'DELETE_TODO';

export interface IAddTodoAction extends Action {
  type: 'ADD_TODO';
  payload: {
    text: string;
  };
}
export interface IToggleTodoAction extends Action {
  type: 'TOGGLE_TODO';
  payload: {
    id: number;
  };
}

/**
 * actionを発行する関数。
 */
export const addTodo    = createAction(ADD,    (text: string) => ({ text }));
export const toggleTodo = createAction(TOGGLE, (id: number) => ({ id }));
export const deleteTodo = createAction(DELETE, (id: number) => ({ id }));
```

```ts:src/sagas/todos.ts
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

export function* deleteTodo(action: {type: string, payload: {id}}) {
  const todos = yield select((state: any) => state.todos);
  const { id } = action.payload;
  const todoList = todos.filter((t) =>  t.id !== id);
  yield put({ type: PUT_REQUEST, payload:{ todoList } });
}
```

```ts:src/sagas/index.ts
import { takeEvery } from 'redux-saga/effects';
import { GET_REQUEST, PUT_REQUEST } from '../actions/storage';
import { ADD, TOGGLE, DELETE } from '../actions/todos';
import { ALL_COMPLETED, ALL_INCOMPLETED,
         allCompletedTodoList, allIncompletedTodoList } from '../modules/allCompoeted';
import { addTodoList, getTodoList, putTodoList, toggleTodo, deleteTodo } from './todos';

function* mySaga() {
  yield takeEvery(ADD, addTodoList);
  yield takeEvery(TOGGLE, toggleTodo);
  yield takeEvery(DELETE, deleteTodo);
  yield takeEvery(GET_REQUEST, getTodoList);
  yield takeEvery(PUT_REQUEST, putTodoList);
  yield takeEvery(ALL_COMPLETED, allCompletedTodoList);
  yield takeEvery(ALL_INCOMPLETED, allIncompletedTodoList);
}

export default mySaga;
```

```ts:src/containers/DeleteTodo.tsx

import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril'; // tslint:disable-line: no-duplicate-imports
import { deleteTodo } from '../actions/todos';
import { connect } from '../mithril-redux';

interface IAttr {
  props: {
    onClick: ()=>void;
  };
}

interface IOwnProps {
  id:number;
}

function mapDispatchToProps(dispatch, {id}: IOwnProps) {
  return {
    onClick() {
      dispatch(deleteTodo(id));
    },
  };
}

class DeleteTodoComponent implements  ClassComponent<IAttr> {
  public view(vnode): Vnode<IAttr, HTMLElement> {
    const { onClick } = vnode.attrs.props;
    return (
      <button  class="destroy" onclick={onClick}></button>
    );
  }
}

export default connect(null, mapDispatchToProps)(DeleteTodoComponent);
```

```ts:src/components/Todo.tsx
import { ClassComponent, Vnode } from 'mithril';
import * as m from 'mithril'; // tslint:disable-line: no-duplicate-imports
import TodoState from '../models/TodoState';
import DeleteTodo from '../containers/DeleteTodo';

interface IAttr extends TodoState {
  onClick: (id: number) => void;
}

export default class Todo implements  ClassComponent<IAttr> {
  /**
   *
   * @param vnode
   */
  public view({ attrs }: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    const { id, text, completed, onClick } = attrs;
    const classes = completed ? 'completed' : '';
    console.log(attrs);
    return (
    <li class={classes}>
      <label>
        <input class="toggle" type="checkbox" onclick={onClick} checked={completed} />
        {text}
      </label>
      <DeleteTodo id={id}>x</DeleteTodo>
    </li>);
  }
}
```

cssでbuttonの後にxを表示している。

```css

#todo-list li .destroy:after {
	content: '×';
}

```


[この時点のソース](https://github.com/hibohiboo/develop/tree/347ed0a0e768dad6bb4f3d73135ad1d3dd27a244/tutorial/lesson/redux-todo-mithril)

## 編集機能を追加する

### 編集用のinputを表示する。

cssを使って編集中のときだけ表示するようにする。

```css:public/style.css
#todo-list {
	margin: 0;
	padding: 0;
	list-style: none;
}
#todo-list li {
	position: relative;
	font-size: 24px;
	border-bottom: 1px solid #ededed;
}

#todo-list li .toggle {
	text-align: center;
	width: 40px;
	height: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	margin: auto 0;
	border: none; /* Mobile Safari */
	-webkit-appearance: none;
	appearance: none;
}
#todo-list li .toggle:after {
	content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#000000" stroke-width="3"/></svg>');
}
#todo-list li .toggle:checked:after {
	content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
}
#todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}
#todo-list li label{
	white-space: pre-line;
	word-break: break-all;
	padding: 15px 60px 15px 15px;
	margin-left: 45px;
	display: block;
	line-height: 1.2;
	transition: color 0.4s;
}
#todo-list li.editing label {
	display: none;
}
#todo-list li .edit {
	display: none;
}
#todo-list li .destroy {
	display: none;
	position: absolute;
	top: 0;
	right: 10px;
	bottom: 0;
	width: 40px;
	height: 40px;
	margin: auto 0;
	font-size: 30px;
	color: #cc9a9a;
	margin-bottom: 11px;
	transition: color 0.2s ease-out;
}
#todo-list li .destroy:hover {
	color: #af5b5e;
}
#todo-list li .destroy:after {
	content: '×';
}
#todo-list li:hover .destroy {
	display: block;
}
#todo-list li.editing .destroy {
	display: none;
}
#todo-list .editing .edit {
	display: block;
	width: 506px;
	padding: 13px 17px 12px 17px;
	margin: 0 0 0 55px;
}
```

todoStateのプロパティにeditingを追加。

```ts:src/models/todoState.ts
const uniqueId = (() => {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
})();

export default class TodoState {
  public id: number;
  public text: string;
  public completed: boolean = false;
  public editing: boolean = false;

  constructor(data) {
    this.id = uniqueId();
    this.text = data.text;
    this.completed = data.completed || false;
    this.editing = data.editing || false;
  }
}
```

編集用のInputと表示用のLabelを持ったコンポーネントを作成。

```ts:src/containers/EditTodo.tsx

import * as m from 'mithril';
import { ClassComponent, Vnode } from 'mithril'; // tslint:disable-line: no-duplicate-imports
import { connect } from '../mithril-redux';
import { editingTodo } from '../actions/todos';
import TodoState from '../models/TodoState';
interface IAttr{}

interface IOwnProps {
  id:number;
  text: string;
}

const mapStateToProps = (store, {text}: IOwnProps) => {
  return { text };
};


const mapDispatchToProps = (dispatch, {id}: IOwnProps) => {
  return {
    onDoubleClick() {
      dispatch(editingTodo(id));
    },
  };
}

class EditTodoComponent implements  ClassComponent<IAttr> {
  public view(vnode): Vnode<IAttr, HTMLElement> {
    const { text, onDoubleClick } = vnode.attrs.props;

    return (
      <div>
        <label ondblclick={onDoubleClick}>
          {text}
        </label>
        <input class="edit" value={text} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTodoComponent);
```

ラベルの代わりにコンポーネントを使用するように変更。
編集中のクラスを追加。

```ts:src/components/Todo.tsx
import { ClassComponent, Vnode } from 'mithril';
import * as m from 'mithril'; // tslint:disable-line: no-duplicate-imports
import TodoState from '../models/TodoState';
import DeleteTodo from '../containers/DeleteTodo';
import EditTodo from '../containers/EditTodo';

interface IAttr extends TodoState {
  onClick: (id: number) => void;
}

export default class Todo implements  ClassComponent<IAttr> {
  /**
   *
   * @param vnode
   */
  public view({ attrs }: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    const { id, text, completed, editing, onClick } = attrs;
    const classes = ( completed ? 'completed ' : '') + 
                    ( editing   ? 'editing '   : '');
    return (
    <li class={classes}>
      <div class="view">
        <input class="toggle" type="checkbox" onclick={onClick} checked={completed} />
        <EditTodo text={text} id={id} />
        <DeleteTodo id={id} />
      </div>
    </li>);
  }
}
```

アクションを追加。

```ts:src/actions/todos.ts
import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ADD = 'ADD_TODO';
export const TOGGLE = 'TOGGLE_TODO';
export const DELETE = 'DELETE_TODO';
export const EDITING = 'EDITING_TODO';

export interface IAddTodoAction extends Action {
  type: 'ADD_TODO';
  payload: {
    text: string;
  };
}
export interface IToggleTodoAction extends Action {
  type: 'TOGGLE_TODO';
  payload: {
    id: number;
  };
}
export interface IEditingAction extends Action {
  type: 'EDITING_TODO';
  payload: {
    id: number;
  };
}
/**
 * actionを発行する関数。
 */
export const addTodo    = createAction(ADD,    (text: string) => ({ text }));
export const toggleTodo = createAction(TOGGLE, (id: number) => ({ id }));
export const deleteTodo = createAction(DELETE, (id: number) => ({ id }));
export const editingTodo = createAction(EDITING, (id: number) => ({ id }));
```

editingTodoを追加。

```ts:src/sagas/todos.ts
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { GET_FAILED, GET_REQUEST, GET_SUCCESS,
         PUT_FAILED, PUT_REQUEST, PUT_SUCCESS } from '../actions/storage';
import { get as getTodo, put as putTodo } from '../browser/storage';
import TodoState from '../models/TodoState';

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
    if (t.id !== id) {
      return t;
    }
    t.completed = !t.completed;
    return  new TodoState(t);
  });
  yield put({ type: PUT_REQUEST, payload:{ todoList } });
}
export function* putTodoList(action: {type: string, payload: {todoList: TodoState[]}}) {
  try {
    yield call(putTodo, action.payload.todoList);
    yield put({ type: PUT_SUCCESS, payload:{ todoList: action.payload.todoList } });
  } catch (e) {
    yield put({ type: PUT_FAILED, message: e.message });
  }
}
export function* getTodoList(action: {type: string;}) {
  try {
    const todoList: TodoState[] = yield call(getTodo);
    yield put({ type: GET_SUCCESS, payload:{ todoList } });
  } catch (e) {
    yield put({ type: GET_FAILED, message: e.message });
  }
}
export function* deleteTodo(action: {type: string, payload: {id}}) {
  const todos = yield select((state: any) => state.todos);
  const { id } = action.payload;
  const todoList = todos.filter((t) =>  t.id !== id);
  yield put({ type: PUT_REQUEST, payload:{ todoList } });
}
export function* editingTodo(action: {type: string, payload: {id}}) {
  console.log(action);
  const todos = yield select((store: any) => store.todos);
  const { id } = action.payload;
  const todoList = todos.map((t) => {
    // actionCreatorに渡したidと一致するtodoのみ処理
    if (t.id !== id) {
      return t;
    }
    // editingをtrueに
    t.editing = true;
    return  new TodoState(t);
  });
  yield put({ type: PUT_REQUEST, payload:{ todoList } });
}
```

```ts:src/sagas/index.ts
import { takeEvery } from 'redux-saga/effects';
import { GET_REQUEST, PUT_REQUEST } from '../actions/storage';
import { ADD, TOGGLE, DELETE, EDITING } from '../actions/todos';
import { ALL_COMPLETED, ALL_INCOMPLETED,
         allCompletedTodoList, allIncompletedTodoList } from '../modules/allCompoeted';
import { addTodoList, getTodoList, putTodoList, toggleTodo, deleteTodo, editingTodo } from './todos';
function* mySaga() {
  yield takeEvery(ADD, addTodoList);
  yield takeEvery(TOGGLE, toggleTodo);
  yield takeEvery(DELETE, deleteTodo);
  yield takeEvery(GET_REQUEST, getTodoList);
  yield takeEvery(PUT_REQUEST, putTodoList);
  yield takeEvery(ALL_COMPLETED, allCompletedTodoList);
  yield takeEvery(ALL_INCOMPLETED, allIncompletedTodoList);
  yield takeEvery(EDITING, editingTodo);
}
export default mySaga;
```

[この時点のソース](https://github.com/hibohiboo/develop/tree/ee49fc6ad7e2231c90993c3a65330d8f7ffbba06/tutorial/lesson/redux-todo-mithril)

### 編集を確定させる。

doneEditingのアクションを追加

```ts:src/actions/todos.ts
import { Action } from 'redux';
import { createAction } from 'redux-actions';

export const ADD = 'ADD_TODO';
export const TOGGLE = 'TOGGLE_TODO';
export const DELETE = 'DELETE_TODO';
export const EDITING = 'EDITING_TODO';
export const DONE_EDITING = 'DONE_EDITING_TODO';

export interface IAddTodoAction extends Action {
  type: 'ADD_TODO';
  payload: {
    text: string;
  };
}
export interface IToggleTodoAction extends Action {
  type: 'TOGGLE_TODO';
  payload: {
    id: number;
  };
}
export interface IEditingAction extends Action {
  type: 'EDITING_TODO';
  payload: {
    id: number;
  };
}
export interface IDoneEditingAction extends Action {
  type: 'EDITING_TODO';
  payload: {
    id: number;
    text: string;
  };
}
/**
 * actionを発行する関数。
 */
export const addTodo    = createAction(ADD,    (text: string) => ({ text }));
export const toggleTodo = createAction(TOGGLE, (id: number) => ({ id }));
export const deleteTodo = createAction(DELETE, (id: number) => ({ id }));
export const editingTodo = createAction(EDITING, (id: number) => ({ id }));
export const doneEditingTodo = createAction(DONE_EDITING, (id:number, text: string) =>({id, text}));
```

doneEditingのsagaを追加

```ts:src/sagas/todos.ts
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { GET_FAILED, GET_REQUEST, GET_SUCCESS,
         PUT_FAILED, PUT_REQUEST, PUT_SUCCESS } from '../actions/storage';
import { get as getTodo, put as putTodo } from '../browser/storage';
import TodoState from '../models/TodoState';

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
    if (t.id !== id) {
      return t;
    }
    t.completed = !t.completed;
    return  new TodoState(t);
  });
  yield put({ type: PUT_REQUEST, payload:{ todoList } });
}

export function* putTodoList(action: {type: string, payload: {todoList: TodoState[]}}) {
  try {
    yield call(putTodo, action.payload.todoList);
    yield put({ type: PUT_SUCCESS, payload:{ todoList: action.payload.todoList } });
  } catch (e) {
    yield put({ type: PUT_FAILED, message: e.message });
  }
}

export function* getTodoList(action: {type: string;}) {
  try {
    const todoList: TodoState[] = yield call(getTodo);
    yield put({ type: GET_SUCCESS, payload:{ todoList } });
  } catch (e) {
    yield put({ type: GET_FAILED, message: e.message });
  }
}

export function* deleteTodo(action: {type: string, payload: {id}}) {
  const todos = yield select((state: any) => state.todos);
  const { id } = action.payload;
  const todoList = todos.filter((t) =>  t.id !== id);
  yield put({ type: PUT_REQUEST, payload:{ todoList } });
}

export function* editingTodo(action: {type: string, payload: {id}}) {
  const todos = yield select((store: any) => store.todos);
  const { id } = action.payload;
  const todoList = todos.map((t) => {
    if (t.id !== id) {
      return t;
    }
    t.editing = true;
    return  new TodoState(t);
  });
  yield put({ type: PUT_REQUEST, payload:{ todoList } });
}

export function* doneEditingTodo(action: {type: string, payload: {id, text}}) {
  const todos = yield select((store: any) => store.todos);
  const { id, text } = action.payload;
  const todoList = todos.map((t) => {
    if (t.id !== id) {
      return t;
    }

    t.editing = false;
    t.text = text;
    return  new TodoState(t);
  });
  yield put({ type: PUT_REQUEST, payload:{ todoList } });
}
```

```ts:src/sagas/index.ts
import { takeEvery } from 'redux-saga/effects';
import { GET_REQUEST, PUT_REQUEST } from '../actions/storage';
import { ADD, TOGGLE, DELETE, EDITING, DONE_EDITING } from '../actions/todos';
import { ALL_COMPLETED, ALL_INCOMPLETED,
         allCompletedTodoList, allIncompletedTodoList } from '../modules/allCompoeted';
import { addTodoList, getTodoList, putTodoList, toggleTodo, deleteTodo, editingTodo, doneEditingTodo } from './todos';
function* mySaga() {
  yield takeEvery(ADD, addTodoList);
  yield takeEvery(TOGGLE, toggleTodo);
  yield takeEvery(DELETE, deleteTodo);
  yield takeEvery(GET_REQUEST, getTodoList);
  yield takeEvery(PUT_REQUEST, putTodoList);
  yield takeEvery(ALL_COMPLETED, allCompletedTodoList);
  yield takeEvery(ALL_INCOMPLETED, allIncompletedTodoList);
  yield takeEvery(EDITING, editingTodo);
  yield takeEvery(DONE_EDITING, doneEditingTodo);
}
export default mySaga;
```

componentに編集確定イベントとキャンセルイベントの追加

```ts:src/containers/EditTodo.tsx
import * as m from 'mithril';
import { ClassComponent, Vnode, VnodeDOM } from 'mithril'; // tslint:disable-line: no-duplicate-imports
import { connect } from '../mithril-redux';
import { editingTodo, doneEditingTodo } from '../actions/todos';
import TodoState from '../models/TodoState';
interface IAttr{}
interface IOwnProps {
  id:number;
  text: string;
  editing: boolean;
}

const mapStateToProps = (store, { text, editing}: IOwnProps) => {
  return { text, editing };
};
const mapDispatchToProps = (dispatch, {id}: IOwnProps) => {
  return {
    onDoubleClick() {
      dispatch(editingTodo(id));
    },
    onBlur(text:string){
      dispatch(doneEditingTodo(id, text));
    }
  };
}

class EditTodoComponent implements  ClassComponent<IAttr> {
  private value: string;

  public view(vnode): Vnode<IAttr, HTMLElement> {
    const { onDoubleClick, onBlur, text, editing } = vnode.attrs.props;
    this.value = text;
    const doneEditing = () => {
      const val = this.value;
      this.value = '';
      onBlur(val);
    };

    return (
      <div>
        <label ondblclick={onDoubleClick}>
          {text}
        </label>
        <input 
          class="edit" 
          value={this.value}
          onupdate={
            (vnode: VnodeDOM<{}, this>)=>{
              if(editing){
                const element = vnode.dom as HTMLElement;
                element.focus();
              }
            }
          }
          oninput={m.withAttr('value', value => this.value = value)}
          onblur={doneEditing}
          onkeyup={
            (e:KeyboardEvent)=>{
              if(e.key === 'Enter'){
                doneEditing();
              }
              else if(e.key === "Escape"){
                this.value = text;
                onBlur(text);
              }
            }
          }
          />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditTodoComponent);
```

editingの追加。

```ts:src/components/Todo.tsx
import { ClassComponent, Vnode } from 'mithril';
import * as m from 'mithril'; // tslint:disable-line: no-duplicate-imports
import TodoState from '../models/TodoState';
import DeleteTodo from '../containers/DeleteTodo';
import EditTodo from '../containers/EditTodo';

interface IAttr extends TodoState {
  onClick: (id: number) => void;
}

export default class Todo implements  ClassComponent<IAttr> {
  public view({ attrs }: Vnode<IAttr, this>): Vnode<IAttr, HTMLElement> {
    const { id, text, completed, editing, onClick } = attrs;
    const classes = ( completed ? 'completed ' : '') + 
                    ( editing   ? 'editing '   : '');
    return (
    <li class={classes}>
      <div class="view">
        <input class="toggle" type="checkbox" onclick={onClick} checked={completed} />
        <EditTodo text={text} id={id} editing={editing} />
        <DeleteTodo id={id} />
      </div>
    </li>);
  }
}
```


[この時点のソース](https://github.com/hibohiboo/develop/tree/ad966f7077260fd66d112bd7cd4ec868040eeb98/tutorial/lesson/redux-todo-mithril)


## 参考

[todomvc][*1]
[todomvc-common][*2]
[todomvc-app-css][*3]
[shadow-dom][*4]

[*1]:https://github.com/tastejs/todomvc
[*2]:https://github.com/tastejs/todomvc-common
[*3]:https://github.com/tastejs/todomvc-app-css
[*4]:https://sbfl.net/blog/2016/07/17/shadow-dom-v1/