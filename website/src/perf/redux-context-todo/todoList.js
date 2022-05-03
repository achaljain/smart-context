import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateTodos, toggleTodo } from "./store";

import { generate, simulateHandler, showTime } from "../common/utils";
import ToDoItem from "./item";

const ToDoList = ({ config }) => {
  const { perf, inputSize } = config;
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const todosLength = Object.keys(todos).length;

  const toggle = (e) => {
    dispatch(toggleTodo(e.target.id));
  };

  const toggleMemoized = useCallback(toggle, []);

  useEffect(() => {
    showTime(todos);
  }, [todos]);

  useEffect(() => {
    if (config.inputSize) {
      dispatch(generateTodos(generate(inputSize)));
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
