const parse = require("./parser");

module.exports = function consoleUnicorn(msg, ...args) {
  const [placeholder, ...styles] = parse(msg);

  console.log.apply(console, [placeholder, ...styles, ...args]);
};
