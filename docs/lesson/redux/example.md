# redux example

## counter

```js
// Reduxの読み込み
import { createStore } from 'redux';

// Reducer
// 状態を更新する関数
// 第一引数に状態、第二引数にアクションを受け取る。
function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0
  }
  // アクションのtypeによって動作を制御する
  // 返り値で状態を更新する
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

// store
// 状態を保持する
var store = createStore(counter)

// View
// 状態を使って描画する
var valueEl = document.getElementById('value')
function render() {
  valueEl.innerHTML = store.getState().toString()
}
render()

// storeにrenderを登録
store.subscribe(render)


document.getElementById('increment')
  .addEventListener('click', function () {
    //dispatchメソッドで 状態を更新
    // アクションのタイプを指定して与える
    store.dispatch({ type: 'INCREMENT' })
  })
document.getElementById('decrement')
  .addEventListener('click', function () {
    store.dispatch({ type: 'DECREMENT' })
  })
document.getElementById('incrementIfOdd')
  .addEventListener('click', function () {
    if (store.getState() % 2 !== 0) {
      store.dispatch({ type: 'INCREMENT' })
    }
  })
document.getElementById('incrementAsync')
  .addEventListener('click', function () {
    setTimeout(function () {
      store.dispatch({ type: 'INCREMENT' })
    }, 1000)
  })
```