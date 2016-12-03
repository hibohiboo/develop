import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>    
      {/* refのコールバック属性は
      // コンポーネントがマウントした直後に実行され
      // コンポーネント自身が変数として格納される
      // inputに代入*/}
      <input ref={(node) => {
        input = node
      }} />
      {/* inputのvalueをdispatchに渡してstateを更新*/}
      <button onClick={() => {
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        Add Todo
      </button>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo