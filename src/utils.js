export const validateStringLiteral = (str) =>
  str && typeof str === "string" && str.length > 0;

export const validateObject = (obj) =>
  obj && obj.constructor === Object && Object.keys(obj).length > 0;

export const validateArray = (arr) => Array.isArray(arr) && arr.length > 0;

export const validateConfigArray = (arr, elemType) => {
  if (!validateArray(arr)) {
    return false;
  }

  const validator =
    elemType === "object" ? validateObject : validateStringLiteral;
  return arr.every((elem) => validator(elem));
};

export const fireLog = (debug, type, message, data) => {
  if (debug) {
    console[type](`::SMART-CONTEXT::DEBUG:: ${message}`, data);
  }
};
