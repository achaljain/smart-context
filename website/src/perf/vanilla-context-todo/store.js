import { createContext } from "react";
import { updateHandler } from "../common/utils";

export const GlobalContext = createContext({});

const GENERATE_TODO = "GENERATE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

export const initialState = {
  todos: {},
};

/**
 * Random payload
 * Manage type constants
 * Payload is just a convention, not standard
 * Import and pass dispatch in every action call
 */
export const generateTodos = (payload, dispatch) => {
  dispatch({
    type: GENERATE_TODO,
    payload,
  });
};

export const toggleTodo = (id, dispatch) => {
  dispatch({
    type: TOGGLE_TODO,
    payload: id,
  });
};

/**
 *
 * Manage immutability, think about deep nested objects
 * Manage business logic
 * Async scenarios
 */
export const reducer = (state, action) => {
  const { type, payload } = action;
  let newState = state;
  switch (type) {
    case GENERATE_TODO:
      newState = { ...state, todos: payload };
      break;
    case TOGGLE_TODO:
      newState = { ...state, todos: updateHandler(payload, state.todos) };
      break;
  }
  return newState;
};
