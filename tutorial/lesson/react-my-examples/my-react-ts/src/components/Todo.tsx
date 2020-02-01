import React from "react";

const Todo: React.FC<{ completed: boolean, text: string, }> = ({ completed, text }) => {
  return <li style={{ textDecoration: completed ? 'line-through' : 'none' }}>
    {text}
  </li>;
};

export default Todo;