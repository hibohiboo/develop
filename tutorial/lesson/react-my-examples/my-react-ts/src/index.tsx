import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore } from "redux";
import todo, { initialState } from "./reducers";
import { addTodo } from "./actions";

// createStoreの引数が1つだと初期値がなくてエラーとなる
const store = createStore(todo, initialState());

store.dispatch(addTodo("Hello World!"));
console.log(store.getState()); // => TodoState {id: 0, text: "Hello World!"}
ReactDOM.render(<App />, document.getElementById("root"));
