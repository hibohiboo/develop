import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import { addTodo } from "./actions";
import { initStore } from "./store";

const store = initStore();

store.dispatch(addTodo("Hello World!"));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
