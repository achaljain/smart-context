import React, { useContext, useCallback, useEffect } from "react";
import { getContext, WithContextProvider } from "smart-context";

import config from "./store";

import { generate, simulateHandler, showTime } from "../common/utils";
import ToDoItem from "./item";

const ToDoList = ({ config: Config }) => {
  const { perf, inputSize } = Config;
  const { state, actions } = useContext(getContext("ToDo"));
  const { generateTodos, toggleTodo } = actions;
  const { todos } = state;
  const todosLength = Object.keys(todos).length;

  const toggle = (e) => {
    toggleTodo(e.target.id);
  };

  const toggleMemoized = useCallback(toggle, []);

  useEffect(() => {
    showTime(todos);
  }, [todos]);

  useEffect(() => {
    if (Config.inputSize) {
      generateTodos({
        todos: generate(inputSize),
      });
    }
  }, [Config]);

  useEffect(() => {
    if (todosLength === inputSize) {
      simulateHandler();
    }
  }, [Config, todosLength]);

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

export default React.memo(WithContextProvider(ToDoList, [config]));
