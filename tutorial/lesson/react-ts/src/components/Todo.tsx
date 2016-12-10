import * as React from 'react';
import {PropTypes} from 'react';

interface IProps {
    text: string;
}

// propsを展開して分割代入
const Todo = ({ text }:IProps) => (
  <li>
    {text}
  </li>
);

// Todo.propTypesとするとProperty 'propTypes' does not exist on typeのエラーがでる。
Todo.prototype.propTypes = {
  text: PropTypes.string.isRequired
}

export default Todo;