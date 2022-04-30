import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateTodos, toggleTodo } from "./store";

import { generate, simulateHandler } from "../common/utils";
import ToDoItem from "./item";

const ToDoList = ({ perf, inputSize }) => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const createTodos = () => {
    dispatch(generateTodos(generate(inputSize)));
  };

  const simulateTodo = () => {
    simulateHandler();
  };

  const toggle = (e) => {
    dispatch(toggleTodo(e.target.id));
  };

  const toggleMemoized = useCallback(toggle, []);

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
