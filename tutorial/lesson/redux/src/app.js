import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'


// ストアの作成
const store = createStore(reducer)

// 画面に描画
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)