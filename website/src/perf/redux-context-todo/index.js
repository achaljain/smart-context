import React from "react";
import { Provider } from "react-redux";

import ToDoList from "./todoList";
import store from "./store";

const WithReduxProvider = ({ config }) => {
  return (
    <Provider store={store}>
      <ToDoList config={config} />
    </Provider>
  );
};

export default React.memo(WithReduxProvider);
