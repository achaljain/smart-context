const ContextRegister = {};

export const registerContextParams = ({ displayName, params }) => {
  if (!ContextRegister[displayName]) {
    ContextRegister[displayName] = {};
  }

  Object.keys(params).forEach((key) => {
    ContextRegister[displayName][key] = params[key];
  });
};

export const getContextParam = (displayName, key) => {
  if (ContextRegister[displayName]) {
    return ContextRegister[displayName][key];
  }

  return null;
};
