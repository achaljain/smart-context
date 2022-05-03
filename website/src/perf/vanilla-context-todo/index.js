import React, { useReducer } from "react";

import { GlobalContext, initialState, reducer } from "./store";

import ToDoList from "./todoList";

const WithContextProvider = ({ config }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <ToDoList config={config} />
    </GlobalContext.Provider>
  );
};

export default React.memo(WithContextProvider);
