import { connect } from 'react-redux'
import TodoList from '../components/TodoList'

// storeに格納してあるstateをpropsとして使えるように
const mapStateToProps = (state) => {
  return { todos: state.todos }
}

// TodoListコンポーネントをconnect
const VisibleTodoList = connect(
  mapStateToProps
)(TodoList)
export default VisibleTodoList