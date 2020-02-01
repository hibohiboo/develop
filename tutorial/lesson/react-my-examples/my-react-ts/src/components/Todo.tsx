import React from "react";

const Todo: React.FC<{ completed: boolean, text: string, toggle: any }> = React.memo(({ completed, text, toggle }) => {
  return <li style={{ textDecoration: completed ? 'line-through' : 'none' }} onClick={toggle}>
    {text}
  </li >;
});

export default Todo;