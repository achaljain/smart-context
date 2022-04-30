import { updateHandler } from "../common/utils";

const initialState = {
  todos: {},
};

const actionsConfig = {
  generateTodos: ["todos"],

  toggleTodo: (id) => (state) => ({
    ...state,
    todos: updateHandler(id, state.todos),
  }),
};

const displayName = "ToDo";

const config = {
  initialState,
  actionsConfig,
  displayName,
  debug: false,
};

export default config;
