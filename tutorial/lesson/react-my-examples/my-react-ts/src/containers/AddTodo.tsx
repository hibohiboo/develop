import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { addTodo } from "../actions";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleClick: (text: string) => dispatch(addTodo(text))
});

let AddTodo: React.FC<any> = ({ handleClick }) => {
  let input: HTMLInputElement;

  return (
    <div>
      <input
        ref={node => {
          input = node!; // nodeがnullはありえないので、!でnullでないことを示す
        }}
      />
      <button
        onClick={() => {
          handleClick(input.value);
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

AddTodo = connect(null, mapDispatchToProps)(AddTodo);

export default AddTodo;
