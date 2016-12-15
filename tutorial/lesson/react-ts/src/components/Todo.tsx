import * as React from 'react';
import {PropTypes} from 'react';

interface IProps {
    completed: boolean;
    text: string;
}

// propsを展開して分割代入
const Todo = ({ completed, text }:IProps) => (
  <li style={{textDecoration: completed ? 'line-through' : 'none'}}>
    {text}
  </li>
);

// Todo.propTypesとするとProperty 'propTypes' does not exist on typeのエラーがでる。
Todo.prototype.propTypes = {
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo;