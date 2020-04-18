const reSplit = /{([^}]+)}/g;
const reStyle = /^{[^}]+}$/;
const reColors = /^(black|red|green|yellow|blue|magenta|cyan|white|gray|grey)$/;
const reFontWeights = /^(bold)$/;
const reFontStyles = /^(italic)$/;

module.exports = function makeTitle(raw) {
  const text = raw.trim();
  const matches = text.split(reSplit);

  const starts = text.indexOf("{") === 0;

  if (starts) {
    matches.shift();
  }

  const titles = [];
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
      titles.push(part);
    }
  }

  // Build title
  const title = titles.map((str) => `%c${str.trim()}`).join(" ");

  return [title].concat(styles);
};
