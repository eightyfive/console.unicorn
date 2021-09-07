const log = require("./index");

const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

beforeEach(() => {
  jest.clearAllMocks();
});

it("logs colored", () => {
  log("{green; bold}I am hulk {red; italic;}I am flash");

  expect(logSpy).toHaveBeenCalledWith(
    "%cI am hulk %cI am flash",
    "color: green; font-weight: bold",
    "color: red; font-style: italic"
  );
});

it("logs normally", () => {
  log("I am a normal citizen");

  expect(logSpy).toHaveBeenCalledWith("I am a normal citizen");
});

it("logs var", () => {
  const foo = "bar";

  log("{green; bold}I am hulk", foo);

  expect(logSpy).toHaveBeenCalledWith(
    "%cI am hulk",
    "color: green; font-weight: bold",
    "bar"
  );
});
