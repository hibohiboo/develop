# 

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


## 参考

[todomvc][*1]
[todomvc-common][*2]
[todomvc-app-css][*3]

[*1]:https://github.com/tastejs/todomvc
[*2]:https://github.com/tastejs/todomvc-common
[*3]:https://github.com/tastejs/todomvc-app-css