import React from "react";

const Todo: React.FC<{ completed: boolean, text: string, id: number, toggle: (id: number) => void }> = React.memo(({ completed, text, id, toggle }) => {
  return <li style={{ textDecoration: completed ? 'line-through' : 'none' }} onClick={() => toggle(id)}>
    {text}
  </li >;
});

export default Todo;