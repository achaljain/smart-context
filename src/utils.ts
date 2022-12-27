export const validateObject = (obj) =>
  obj && obj.constructor === Object && Object.keys(obj).length > 0

export const validateActionArray = (arr) =>
  Array.isArray(arr) &&
  arr.length > 0 &&
  arr.every((elem) => typeof elem === 'string')

export const fireLog = (
  debug: boolean,
  type: string,
  message: string,
  data: any
) => {
  if (debug) {
    console[type](`::SMART-CONTEXT::DEBUG:: ${message}`, data)
  }
}

export const generateCompHOC = (Comp, configArray, wrapFn) => {
  try {
    const CompWrapped = configArray.reduce(
      (acc, curr) => wrapFn(acc, curr),
      Comp
    )
    return CompWrapped
  } catch (error) {
    fireLog(true, 'error', 'Generate HOC', {
      component: Comp,
      config: configArray,
      error,
    })
    return Comp
  }
}
