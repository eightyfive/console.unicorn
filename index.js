const reSplit = /({[^}]+})/g;
const reStyle = /^{([^}]+)}$/;

const reColors = /^(black|red|green|yellow|blue|magenta|cyan|white|gray|grey)$/;
const reFontWeights = /^(bold)$/;
const reFontStyles = /^(italic)$/;

module.exports = function parse(msg) {
  const parts = msg.split(reSplit);

  if (parts.length < 2) {
    return [msg];
  }

  const texts = [];
  const styles = [];

  for (const part of parts) {
    const [, style] = reStyle.exec(part) || [];

    if (style) {
      styles.push(createStyle(style));
    } else {
      texts.push(part);
    }
  }

  const placeholder = createPlaceholder(texts, styles);

  return [placeholder].concat(styles);
};

function createPlaceholder(texts, styles) {
  const placeholder = texts.map((str) => `%c${str}`).join("");

  const startsWithStyle = texts.length === styles.length;

  if (startsWithStyle) {
    return placeholder;
  }

  return placeholder.substr(2);
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
