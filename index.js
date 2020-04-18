const makeTitle = require("./title");

module.exports = function consoleTitle() {
  const args = Array.from(arguments);
  const text = args.shift();

  const title = makeTitle(text);

  for (const arg of title.reverse()) {
    args.unshift(arg);
  }

  console.log.apply(console, args);
};
