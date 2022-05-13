import { fireLog, validateActionArray } from "../utils";

describe("Utils", () => {
  let spy;

  beforeAll(() => {
    spy = jest.spyOn(console, "log");
  });

  afterAll(() => {
    spy.mockRestore();
  });

  it("should validate config array", () => {
    expect(validateActionArray("str")).toBeFalsy();
    expect(validateActionArray([])).toBeFalsy();
    expect(validateActionArray(["str"])).toBeTruthy();
  });

  it("should fire logs", () => {
    fireLog(false, "log", "test", { a: 1 });
    expect(spy).not.toHaveBeenCalled();

    fireLog(true, "log", "test", { a: 1 });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
