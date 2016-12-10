import * as React from 'react';
import Todo from './Todo';
import TodoState from '../states/TodoState';

// PropsをReact.Props<設定予定のコンポーネント>で継承して作ると補完が効く
// パラメータが足りないとエラーを吐く
interface IProps extends React.Props<TodoList> {
    todos: TodoState[];
}

class TodoList extends React.Component<IProps, {}> {
  constructor(public props: IProps) {
    super(props);
  }
  render(){
    return (
      <ul>
        {this.props.todos.map((todo) =>
          <Todo
            key={todo.id}
            {...todo}
          />
        )}
      </ul>
    );
  }
 }

 export default TodoList;