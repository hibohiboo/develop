import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import { toggleTodo } from '../actions'

// 格納されたtodosをフィルターの値によって変更
// getVisibleTodos関数によって、フィルターに合致するtodosを返す。
// todos.filterのfilterは文字列ではなく
// 配列のメソッドのfilter
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter((t) => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter((t) => !t.completed)
  }
}


// storeに格納してあるstateをpropsとして使えるように
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
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