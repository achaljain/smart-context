import { getActionName, checkValidActionKey, logger } from "../utils";

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

  it("should fire logs", () => {
    logger("log", "test", { a: 1 });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
