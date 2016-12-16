import * as React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

interface IDispatch {
  // ?をつけないと以下のエラーが発生
  // Property 'dispatch' is missing in type 'IntrinsicAttributes & IDispatch'.
  dispatch?: any;
}

let AddTodo = ({ dispatch }:IDispatch): JSX.Element => {
  let input:HTMLInputElement;

  return (
    <div>
      <input ref={(node) => {
        input = node
      }} />
      <button onClick={() => {
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        Add Todo
      </button>
    </div>
  );
};

AddTodo = connect()(AddTodo);

export default AddTodo;