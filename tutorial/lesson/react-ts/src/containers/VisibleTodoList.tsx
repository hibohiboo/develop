import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import { TodoState } from '../reducers/todos';

interface IStateToProps {
    todos: TodoState[];
}

const mapStateToProps = (store:any): IStateToProps=> {
  return { todos: store.todos }
}

const VisibleTodoList = connect(
  mapStateToProps
)(TodoList);

export default VisibleTodoList;