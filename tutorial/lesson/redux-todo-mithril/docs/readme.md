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

