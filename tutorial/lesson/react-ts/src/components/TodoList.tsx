import * as React from 'react';
import { PropTypes } from 'react';
import Todo from './Todo';

// interface TodoListProps extends React.Props<TodoList> {
//     todos: TodoState[];
// }



const TodoList = ({ todos }) => (
  <ul>
    {todos.map((todo) =>
      <Todo
        key={todo.id}
        {...todo}
      />
    )}
  </ul>
);

export default TodoList;