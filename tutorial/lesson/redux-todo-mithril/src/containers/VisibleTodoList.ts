import TodoList from '../components/TodoList';
import { connect } from '../mithril-redux';
import TodoState from '../models/TodoState';

interface IStateToProps {
  todos: TodoState[];
}

const mapStateToProps = (store): IStateToProps => {
  return { todos: store.todos };
};

export default connect(
  mapStateToProps,
)(TodoList);
