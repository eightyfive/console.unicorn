const unicorn = require("./unicorn");

module.exports = function consoleUnicorn() {
  const args = Array.from(arguments);
  const text = args.shift();

  const colored = unicorn(text);

  for (const arg of colored.reverse()) {
    args.unshift(arg);
  }

  console.log.apply(console, args);
};
