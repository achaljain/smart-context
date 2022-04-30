/** This is simple flat store with default actions */

const initialState = { name: "", email: "" };

const actionsConfig = {
  updateUser: ["name", "email"],
};

const displayName = "user";

const config = {
  initialState,
  actionsConfig,
  displayName,
  debug: true,
};

export default config;
