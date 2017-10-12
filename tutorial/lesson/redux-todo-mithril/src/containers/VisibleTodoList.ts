import { toggleTodo } from '../actions';
import { VisibilityFilterType } from '../actions/filter';
import TodoList from '../components/TodoList';
import { connect } from '../mithril-redux';
import TodoState from '../models/TodoState';

interface IStateToProps {
  todos: TodoState[];
}
interface IDispatchToProps {
  onTodoClick: (id: number) => void;
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
  return { todos: getVisibleTodos(store.todos, store.visibilityFilter) };
};

const mapDispatchToProps = (dispatch): IDispatchToProps => {
  return {
    onTodoClick: (id: number) => {
      dispatch(toggleTodo(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
