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