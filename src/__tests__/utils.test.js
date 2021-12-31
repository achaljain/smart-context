import { fireLog, validateConfigArray, validateStringLiteral } from "../utils";

describe("Utils", () => {
  let spy;

  beforeAll(() => {
    spy = jest.spyOn(console, "log");
  });

  afterAll(() => {
    spy.mockRestore();
  });

  it("should validate string", () => {
    expect(validateStringLiteral("")).toBeFalsy();
    expect(validateStringLiteral("valid string")).toBeTruthy();
  });

  it("should validate config array", () => {
    expect(validateConfigArray("str")).toBeFalsy();
    expect(validateConfigArray([])).toBeFalsy();
    expect(validateConfigArray(["str"])).toBeTruthy();
    expect(validateConfigArray([{}], "object")).toBeFalsy();
    expect(validateConfigArray([{ debug: true }], "object")).toBeTruthy();
  });

  it("should fire logs", () => {
    fireLog(false, "log", "test", { a: 1 });
    expect(spy).not.toHaveBeenCalled();

    fireLog(true, "log", "test", { a: 1 });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
