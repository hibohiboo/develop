import React from "react";
import { useDispatch } from "react-redux";
import { toggleTodo } from "../actions";
import Todo from "./Todo";
import { useTodoItems } from '../reducers/todos';
import { useVisibleFilter } from '../module/visibilityFilterModules';

const TodoList: React.FC = props => {
  let todos = useTodoItems();
  const dispatch = useDispatch();
  const filter = useVisibleFilter();

  switch (filter) {
    case 'SHOW_ALL':
      break;
    case 'SHOW_COMPLETED':
      todos = todos.filter((t) => t.completed);
      break;
    case 'SHOW_ACTIVE':
      todos = todos.filter((t) => !t.completed);
  }

  return (
    <ul>
      {todos.map(todo => <Todo key={todo.id} {...todo} toggle={() => dispatch(toggleTodo(todo.id))} />)}
    </ul>
  );
};

export default TodoList;