// camelCase to SCREAMING_SNAKE_CASE
export const getActionName = (str) =>
  str.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toUpperCase();

export const validateStringLiteral = (str) =>
  typeof str === "string" && str !== "";

export const checkValidActionKey = (val) => {
  const isArray = Array.isArray(val);
  const allStrings = isArray && val.every((i) => validateStringLiteral(i));
  return allStrings;
};

export const fireLog = (debug, type, message, data) => {
  if (debug) {
    console[type](`::SMART-CONTEXT::DEBUG:: ${message}`, data);
  }
};

export const validateConfigArray = (obj) =>
  Array.isArray(obj) && obj.length > 0;
