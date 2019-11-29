import React from "react";

const Todo: React.FC<{ text: string }> = ({ text }) => {
  return <li>{text}</li>;
};

export default Todo;
