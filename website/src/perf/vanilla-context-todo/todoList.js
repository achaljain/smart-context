import React, { useCallback, useContext, useEffect } from "react";

import { GlobalContext, generateTodos, toggleTodo } from "./store";

import { generate, showTime, simulateHandler } from "../common/utils";
import ToDoItem from "./item";

const ToDoList = ({ config }) => {
  const { perf, inputSize } = config;
  const { state, dispatch } = useContext(GlobalContext);
  const { todos } = state;

  const todosLength = Object.keys(todos).length;

  const toggle = (e) => {
    toggleTodo(e.target.id, dispatch);
  };

  const toggleMemoized = useCallback(toggle, []);

  useEffect(() => {
    showTime(todos);
  }, [todos]);

  useEffect(() => {
    if (config.inputSize) {
      generateTodos(generate(inputSize), dispatch);
    }
  }, [config]);

  useEffect(() => {
    if (todosLength === inputSize) {
      simulateHandler();
    }
  }, [config, todosLength]);

  return (
    <div className="todo-container">
      {Object.keys(todos).map((i) => (
        <ToDoItem
          key={i}
          todo={todos[i]}
          toggle={perf ? toggleMemoized : toggle}
        />
      ))}
    </div>
  );
};

export default ToDoList;
