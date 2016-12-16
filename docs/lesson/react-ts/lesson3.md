[Redux ExampleのTodo ListをはじめからていねいにをTypescriptで(1)][*3],
[Redux ExampleのTodo ListをはじめからていねいにをTypescriptで(2)][*2]の続き。  
[Redux ExampleのTodo Listをはじめからていねいに(3)][*1]をtypescriptで書いたメモ。

## 1. actionCreatorとreducerでフィルターの値をstore(state)に格納

### actionCreatorの作成

```ts:src/actions/index.tsx
// 省略

export interface IVisibilityFilter extends Action{
    type: 'SET_VISIBILITY_FILTER',
    filter: string
}

//省略

export const setVisibilityFilter = (filter:string) : IVisibilityFilter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}
```

### reducersの作成

```ts:src/reducers/visibilityFilter.tsx
import { IVisibilityFilter } from '../actions';

const visibilityFilter = (state = 'SHOW_ALL', action:IVisibilityFilter) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter;
```

```ts:src/reducers/index.tsx
import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter';

const todoApp = combineReducers({ 
  todos,
  visibilityFilter 
});
export default todoApp;
```

### 確認

```ts:src/app.tsx
// 省略

import { addTodo, toggleTodo, setVisibilityFilter } from './actions';

// 省略

console.log(store.getState()) // => Object {todos: Array[0], visibilityFilter: "SHOW_ALL"}
store.dispatch(setVisibilityFilter('SHOW_COMPLETED'))
console.log(store.getState()) // => Object {todos: Array[0], visibilityFilter: "SHOW_COMPLETED"}

// 省略
```

### ここの時点のソース

[github](https://github.com/hibohiboo/develop/tree/72a4f4790dd18fe9d085408df6be9a924074ffb4/tutorial/lesson/react-ts)


## 参考

[Redux ExampleのTodo Listをはじめからていねいに(3)][*1]  
[Redux ExampleのTodo ListをはじめからていねいにをTypescriptで(2)][*2]  
[Redux ExampleのTodo ListをはじめからていねいにをTypescriptで(1)][*3]  

[*1]:http://qiita.com/xkumiyu/items/1ba476b8043b71561f52
[*2]:http://qiita.com/hibohiboo/items/ca9d5a5bb04d0a50db00
[*3]:http://qiita.com/hibohiboo/items/e344d2bbbaaab0ba8a66