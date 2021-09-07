const reSplit = /({[^}]+})/g;
const reStyle = /^{([^}]+)}$/;

const reColors = /^(black|red|green|yellow|blue|magenta|cyan|white|gray|grey)$/;
const reFontWeights = /^(bold)$/;
const reFontStyles = /^(italic)$/;

module.exports = function parse(raw) {
  const matches = raw.split(reSplit).filter((str) => str.trim());

  if (matches.length < 2) {
    return [raw];
  }

  const texts = [];
  const styles = [];

  for (const text of matches) {
    const [, style] = reStyle.exec(text) || [];

    if (style) {
      styles.push(createStyle(style));
    } else {
      texts.push(text);
    }
  }

  const label = createLabel(texts, styles);

  return [label].concat(styles);
};

function createLabel(texts, styles) {
  const label = texts.map((str) => `%c${str}`).join("");

  const startsWithStyle = texts.length === styles.length;

  if (startsWithStyle) {
    return label;
  }

  return label.substr(2);
}

function createStyle(style) {
  return style
    .trim()
    .split(";")
    .map((str) => str.trim())
    .filter(Boolean)
    .map((prop) => {
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
    .join("; ");
}
