import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';
import { connect } from '../mithril-redux';
import TodoState from '../models/TodoState';

interface IStateToProps {
  todos: TodoState[];
}
interface IDispatchToProps {
  onTodoClick: (id: number) => void;
}

const mapStateToProps = (store): IStateToProps => {
  return { todos: store.todos };
};

const mapDispatchToProps = (dispatch): IDispatchToProps => {
  return {
    onTodoClick: (id: number) => {
      dispatch(toggleTodo(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
