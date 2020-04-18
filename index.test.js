const consoleTitle = require("./index");

test("console.title", () => {
  const log = jest.spyOn(console, "log").mockImplementation(() => {});

  consoleTitle("{green; bold}I am hulk {red; italic;}I am flash");

  expect(log).toHaveBeenCalledWith(
    "%cI am hulk %cI am flash",
    "color: green; font-weight: bold",
    "color: red; font-style: italic"
  );
});
