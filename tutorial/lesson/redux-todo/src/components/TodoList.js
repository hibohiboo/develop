import React, { PropTypes } from 'react'
import Todo from './Todo'

const TodoList = ({ todos }) => (
  <ul>
    {todos.map((todo) =>
      // {...todo}はtodoのすべての要素
      // id={todo.id} text={todo.text}と同
      <Todo
        key={todo.id}
        {...todo}
      />
    )}
  </ul>
)

// idはnumber
// textはstring
TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default TodoList

