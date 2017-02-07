import * as React from 'react';
import TodoState from '../states/TodoState';
import Todo from './Todo';

// PropsをReact.Props<設定予定のコンポーネント>で継承して作ると補完が効く
// パラメータが足りないとエラーを吐く
interface IProps extends React.Props<TodoList> {
    todos: TodoState[];
    onTodoClick: Function;
}

class TodoList extends React.Component<IProps, {}> {
  render(): JSX.Element{
    return (
      <ul>
        {this.props.todos.map((todo) =>
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => this.props.onTodoClick(todo.id)}
          />,
        )}
      </ul>
    );
  }
 }

 export default TodoList;