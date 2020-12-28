// camelCase to SCREAMING_SNAKE_CASE
export const getActionName = (str) =>
  str.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toUpperCase();

export const checkValidActionKey = (val) => {
  const isArray = Array.isArray(val);
  const allStrings = isArray && val.every((i) => typeof i === "string");
  return allStrings;
};

export const logger = (type, message, data) => {
  console[type](`::SMART-CONTEXT::DEBUG:: ${message}`, data);
};
