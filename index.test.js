const unicorn = require("./index");

beforeEach(() => {
  jest.clearAllMocks();
});

test("unicorn", () => {
  const log = jest.spyOn(console, "log").mockImplementation(() => {});

  unicorn("{green; bold}I am hulk {red; italic;}I am flash");

  expect(log).toHaveBeenCalledWith(
    "%cI am hulk %cI am flash",
    "color: green; font-weight: bold",
    "color: red; font-style: italic"
  );
});

test("not unicorn", () => {
  const log = jest.spyOn(console, "log").mockImplementation(() => {});

  unicorn("I am a normal citizen");

  expect(log).toHaveBeenCalledWith("I am a normal citizen");
});
