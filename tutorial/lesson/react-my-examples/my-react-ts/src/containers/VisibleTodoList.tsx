import { connect } from "react-redux";
import TodoList from "../components/TodoList";
import { StoreState } from "../store";

const mapStateToProps = (store: StoreState) => {
  return { todos: store.todos.todos };
};

const VisibleTodoList = connect(mapStateToProps)(TodoList);

export default VisibleTodoList;
