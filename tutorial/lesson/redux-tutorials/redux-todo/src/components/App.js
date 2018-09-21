import React from 'react'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import Footer from './Footer'

const App = () => (
  <div>
    {/* stateを更新するAddToDoコンテナを表示 */}
    <AddTodo />

    {/* TodoListコンポーネントをconnectした
       VisibleTodoListコンテナを表示*/}
    <VisibleTodoList />
    <Footer />
  </div>
)
export default App