import React, { PropTypes } from 'react'

// propとして送られてきたtextを表示する。
// todoのcompletedがtrueのとき取り消し線
const Todo = ({ completed, text }) => (
  <li style={{textDecoration: completed ? 'line-through' : 'none'}}>
    {text}
  </li>
)

// completedはbool型
// textはstring型
Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo