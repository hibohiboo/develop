import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions";

const AddTodo: React.FC = props => {

  // local state
  const [input, setInput] = useState("");

  // dispatch を用意
  const dispatch = useDispatch();

  // ハンドラーを用意。タスクを追加したらテキストエリアのクリア
  const clickHandler = () => {
    if (input !== "") {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={e => {
          setInput(e.target.value);
        }}
        value={input}
      />
      <button onClick={clickHandler}>add</button>
    </div>
  );
};

export default AddTodo;