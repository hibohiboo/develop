import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todo from './reducers'
import App from './components/App'

import { addTodo } from './actions'

// stateを保存するstoreを作成。
// reducerとしてtodoを登録
let store = createStore(todo)

// actionCreatorであるaddTodo('Hello World!')で
//{ id: 0, text: 'Hello World' }というactionを作成
let helloAction = addTodo('Hello World!') 

// store.dispatch関数にactionを渡す.
// todo reducerに action = { id: 0, text: 'Hello World' },
//                state = 現在のstate(undefined)
store.dispatch(helloAction)

// storeが保持しているstateをstore.getStateで取得
console.log(store.getState()) // => Object {id: 0, text: "Hello World!"}

render(
  // providerにstoreは必須
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)