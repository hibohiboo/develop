import * as React from 'react';
import { PropTypes } from 'react';
import Todo from './Todo';
import { TodoState } from '../reducers/todos';

interface IProps extends React.Props<TodoList> {
    todos: TodoState[];
}

class TodoList extends React.Component<IProps, {}> {
    render() {
        return (
          <ul>
            {this.props.todos.map((todo) =>
              <Todo
                key={todo.id}
                {...todo}
              />
            )}
          </ul>
        )
    }
}

export default TodoList;