import React from "react";
import { Provider } from "react-redux";

import ToDoList from "./todoList";
import store from "./store";

const WithReduxProvider = ({ perf, inputSize }) => {
  return (
    <Provider store={store}>
      <ToDoList perf={perf} inputSize={inputSize} />
    </Provider>
  );
};

export default WithReduxProvider;
