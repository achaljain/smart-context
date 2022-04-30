import React, { useCallback, useContext } from "react";

import { GlobalContext, generateTodos, toggleTodo } from "./store";

import { generate, simulateHandler } from "../common/utils";
import ToDoItem from "./item";

const ToDoList = ({ perf, inputSize }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { todos } = state;

  const createTodos = () => {
    generateTodos(generate(inputSize), dispatch);
  };

  const toggle = (e) => {
    toggleTodo(e.target.id, dispatch);
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

export default ToDoList;
