const getArgs = require("./unicorn");

module.exports = function consoleUnicorn(text, ...args) {
  const coloredArgs = getArgs(text);

  console.log.apply(console, [...coloredArgs, ...args]);
};
