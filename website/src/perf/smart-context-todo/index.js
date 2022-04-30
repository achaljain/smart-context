import React, { useContext, useCallback } from "react";
import { getContext, WithContextProvider } from "smart-context";

import config from "./store";

import { generate, simulateHandler } from "../common/utils";
import ToDoItem from "./item";

const ToDoList = ({ perf, inputSize }) => {
  const { state, actions } = useContext(getContext("ToDo"));
  const { generateTodos, toggleTodo } = actions;
  const { todos } = state;

  const createTodos = () => {
    generateTodos({
      todos: generate(inputSize),
    });
  };

  const toggle = (e) => {
    toggleTodo(e.target.id);
  };

  const toggleMemoized = useCallback(toggle, []);

  const simulateTodo = () => {
    simulateHandler();
  };

  return (
    <>
      <button onClick={createTodos}>Generate</button>
      <button onClick={simulateTodo}>Simulate</button>
      <div className="todo-container">
        {Object.keys(todos).map((i) => (
          <ToDoItem
            key={i}
            todo={todos[i]}
            toggle={perf ? toggleMemoized : toggle}
          />
        ))}
      </div>
    </>
  );
};

export default WithContextProvider(ToDoList, [config]);
