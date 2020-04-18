const unicorn = require("./title");

module.exports = function consoleUnicorn() {
  const args = Array.from(arguments);
  const text = args.shift();

  const title = unicorn(text);

  for (const arg of title.reverse()) {
    args.unshift(arg);
  }

  console.log.apply(console, args);
};
