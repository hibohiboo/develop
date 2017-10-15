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

## 参考

[todomvc][*1]
[todomvc-common][*2]
[todomvc-app-css][*3]

[*1]:https://github.com/tastejs/todomvc
[*2]:https://github.com/tastejs/todomvc-common
[*3]:https://github.com/tastejs/todomvc-app-css