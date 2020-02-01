import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import App from "./components/App";
import reducer from './reducers';
import { addTodo } from "./actions";


const store = configureStore({ reducer });
store.dispatch(addTodo("Hello World!"));
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"));
