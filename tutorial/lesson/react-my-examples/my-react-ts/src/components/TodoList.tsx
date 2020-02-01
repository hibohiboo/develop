import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo } from "../actions";
import Todo from "./Todo";
import { useTodoItems } from '../reducers/todos';

const TodoList: React.FC = props => {
  const todos = useTodoItems();
  const dispatch = useDispatch();
  const clickHandler = useCallback((id: number) => dispatch(toggleTodo(id)), [dispatch]);
  return (
    <ul>
      {todos.map(todo => <Todo key={todo.id} {...todo} toggle={clickHandler} />)}
    </ul>
  );
};

export default TodoList;