const getArgs = require("./unicorn");

it("colors output 1", () => {
  const args = getArgs(
    "{color: green; font-weight: bold;}I am hulk {color: red; font-style: italic}I am flash"
  );

  expect(args).toEqual([
    "%cI am hulk %cI am flash",
    "color: green; font-weight: bold",
    "color: red; font-style: italic",
  ]);
});

it("colors output 2", () => {
  const args = getArgs(" I am a normal citizen {color: blue}I am AVATAR");

  expect(args).toEqual([" I am a normal citizen %cI am AVATAR", "color: blue"]);
});

it("colors using aliases", () => {
  const args = getArgs("{green; bold}I am hulk {red; italic;}I am flash");

  expect(args).toEqual([
    "%cI am hulk %cI am flash",
    "color: green; font-weight: bold",
    "color: red; font-style: italic",
  ]);
});
