import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import { toggleTodo } from '../actions'

// storeに格納してあるstateをpropsとして使えるように
const mapStateToProps = (state) => {
  return { todos: state.todos }
}

// onTodoClickという名前でdispatchをstoreに格納
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      // actionCreatorでアクションを作成
      let action = toggleTodo(id)

      // dispatchによりstoreのstateを変更
      dispatch(action)
    }
  }
}

// TodoListコンポーネントをconnect
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
export default VisibleTodoList

