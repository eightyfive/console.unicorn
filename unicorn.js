const reSplit = /{([^}]+)}/g;
const reStyle = /^{[^}]+}$/;
const reColors = /^(black|red|green|yellow|blue|magenta|cyan|white|gray|grey)$/;
const reFontWeights = /^(bold)$/;
const reFontStyles = /^(italic)$/;

module.exports = function unicorn(raw) {
  const text = raw.trim();
  const matches = text.split(reSplit);

  if (matches.length === 1) {
    return [text];
  }

  const starts = text.indexOf("{") === 0;

  if (starts) {
    matches.shift();
  }

  const texts = [];
  const styles = [];

  for (const [i, match] of matches.entries()) {
    const part = match.trim();
    const even = i % 2 === 0;

    const isStyle = (even && starts) || (!even && !starts);

    if (isStyle) {
      styles.push(
        part
          .split(";")
          .filter((str) => str.trim())
          .map((str) => {
            const prop = str.trim();

            if (reColors.test(prop)) {
              return `color: ${prop}`;
            }

            if (reFontWeights.test(prop)) {
              return `font-weight: ${prop}`;
            }

            if (reFontStyles.test(prop)) {
              return `font-style: ${prop}`;
            }

            return prop;
          })
          .join("; ")
      );
    } else {
      texts.push(part);
    }
  }

  const colored = texts.map((str) => `%c${str.trim()}`).join(" ");

  return [colored].concat(styles);
};
