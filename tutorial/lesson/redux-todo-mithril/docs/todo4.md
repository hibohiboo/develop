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

[この時点のソース](https://github.com/hibohiboo/develop/tree/a6b11aa974caa51b4dfc60231d8ac2170dbb3b65/tutorial/lesson/redux-todo-mithril)


## 参考

[todomvc][*1]
[todomvc-common][*2]
[todomvc-app-css][*3]

[*1]:https://github.com/tastejs/todomvc
[*2]:https://github.com/tastejs/todomvc-common
[*3]:https://github.com/tastejs/todomvc-app-css