const ContextRegister = {};

export const registerContext = ({ context, provider, initialState, debug }) => {
  const { displayName } = context;
  ContextRegister[displayName] = {
    context,
    provider,
    initialState,
    debug,
  };
};

export const registerDispatch = ({ displayName, dispatch }) => {
  if (ContextRegister[displayName]) {
    ContextRegister[displayName].dispatch = dispatch;
  }
};

export const getInitialState = (displayName) => {
  if (ContextRegister[displayName]) {
    return JSON.parse(
      JSON.stringify(ContextRegister[displayName].initialState)
    );
  }

  return {};
};

export const getDispatch = (displayName) => {
  if (!ContextRegister[displayName]) {
    throw new Error(`Context: ${displayName} not found`);
  }

  return ContextRegister[displayName].dispatch;
};

export const getProvider = (displayName) => {
  if (!ContextRegister[displayName]) {
    return null;
  }

  return ContextRegister[displayName].provider;
};

const getContext = (displayName) => {
  if (!ContextRegister[displayName]) {
    return null;
  }

  return ContextRegister[displayName].context;
};

export default getContext;
