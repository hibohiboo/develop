import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from './components/Counter'
import counter from './reducers'

// Storeを定義
const store = createStore(counter)

// 要素を取得
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <Counter
    value={store.getState()}                                   // 状態を渡す
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}  // dispatchにアクションを渡す
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  rootEl
)

render()
store.subscribe(render)