import * as React from 'react';
import { PropTypes } from 'react';

interface IProps extends React.Props<Todo> {
    text: string;
}

class Todo extends React.Component<IProps, {}> {
    render() {
        return (
          <li>
            {this.props.text}
          </li>
        )
    }
}

export default Todo;