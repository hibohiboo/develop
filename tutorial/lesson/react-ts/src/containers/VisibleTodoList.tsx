import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import TodoState from '../states/TodoState';
import { toggleTodo } from '../actions';

interface IStateToProps {
    todos: TodoState[];
}

interface IDispatchToProps{
  onTodoClick: Function
}

const mapStateToProps = (store:any): IStateToProps => {
  return { todos: store.todos };
};

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