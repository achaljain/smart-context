import { configureStore, createSlice } from "@reduxjs/toolkit";

import { updateHandler } from "../common/utils";

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: {},
  },
  reducers: {
    generateTodos: (state, action) => {
      state.todos = action.payload;
    },
    toggleTodo: (state, action) => {
      state.todos = updateHandler(action.payload, state.todos);
    },
  },
});

// Action creators are generated for each case reducer function
export const { generateTodos, toggleTodo } = todoSlice.actions;

/**
 * Create Store
 */
export default configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});
