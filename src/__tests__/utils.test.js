import {
  fireLog,
  getActionName,
  checkValidActionKey,
  validateConfigArray,
  validateStringLiteral,
} from "../utils";

describe("Utils", () => {
  let spy;

  beforeAll(() => {
    spy = jest.spyOn(console, "log");
  });

  afterAll(() => {
    spy.mockRestore();
  });

  it("should return action name in screaming snake case", () => {
    const str = getActionName("setDummyState");
    expect(str).toEqual("SET_DUMMY_STATE");
  });

  it("should validate string", () => {
    expect(validateStringLiteral("")).toBeFalsy();
    expect(validateStringLiteral("valid string")).toBeTruthy();
  });

  it("should check validity of action config", () => {
    const type1 = checkValidActionKey(["a", 123]);
    expect(type1).toEqual(false);

    const type2 = checkValidActionKey([]);
    expect(type2).toEqual(true);

    const type3 = checkValidActionKey("test");
    expect(type3).toEqual(false);

    const type4 = checkValidActionKey(["a", "b"]);
    expect(type4).toEqual(true);
  });

  it("should validate config array", () => {
    expect(validateConfigArray("str")).toBeFalsy();
    expect(validateConfigArray([])).toBeFalsy();
    expect(validateConfigArray([{}])).toBeTruthy();
  });

  it("should fire logs", () => {
    fireLog(false, "log", "test", { a: 1 });
    expect(spy).not.toHaveBeenCalled();

    fireLog(true, "log", "test", { a: 1 });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
