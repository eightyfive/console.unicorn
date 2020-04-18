const unicorn = require("./unicorn");

test("starts with style", () => {
  const text =
    "{color: green; font-weight: bold;}I am hulk {color: red; font-style: italic}I am flash";

  expect(unicorn(text)).toEqual([
    "%cI am hulk %cI am flash",
    "color: green; font-weight: bold",
    "color: red; font-style: italic",
  ]);
});

test("starts with text", () => {
  const text = " I am normal citizen {color: blue}I am AVATAR";

  expect(unicorn(text)).toEqual([
    "%cI am normal citizen %cI am AVATAR",
    "color: blue",
  ]);
});

test("uses alias", () => {
  const text = "{green; bold}I am hulk {red; italic;}I am flash";

  expect(unicorn(text)).toEqual([
    "%cI am hulk %cI am flash",
    "color: green; font-weight: bold",
    "color: red; font-style: italic",
  ]);
});
