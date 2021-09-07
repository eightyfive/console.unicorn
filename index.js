const parse = require("./parser");

module.exports = function consoleUnicorn(text, ...args) {
  const coloredArgs = parse(text);

  console.log.apply(console, [...coloredArgs, ...args]);
};
