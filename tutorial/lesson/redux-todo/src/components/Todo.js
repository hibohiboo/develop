import React, { PropTypes } from 'react'

// propとして送られてきたtextを表示する。
const Todo = ({ text }) => (
  <li>
    {text}
  </li>
)
// textはstring型
Todo.propTypes = {
  text: PropTypes.string.isRequired
}

export default Todo