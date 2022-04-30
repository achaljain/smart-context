import React, { useReducer } from "react";

import { GlobalContext, initialState, reducer } from "./store";

import ToDoList from "./todoList";

const WithContextProvider = ({ perf, inputSize }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <ToDoList perf={perf} inputSize={inputSize} />
    </GlobalContext.Provider>
  );
};

export default WithContextProvider;
