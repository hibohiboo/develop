import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import TodoState from '../states/TodoState';
import { toggleTodo } from '../actions';
import { VisibilityFilterType } from '../states/VisibilityFilterType';

interface IStateToProps {
    todos: TodoState[];
}

interface IDispatchToProps{
  onTodoClick: Function
}

const getVisibleTodos = (todos: TodoState[], filter:VisibilityFilterType):TodoState[] => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter((t) => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter((t) => !t.completed)
  }
}

const mapStateToProps = (store): IStateToProps => {
  return {
    todos: getVisibleTodos(store.todos, store.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch:Function):IDispatchToProps => {
  return {
    onTodoClick: (id:number) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;