# `console.unicorn`

## I am Hulk

```js
log("{green; bold}I am hulk");
```

<img src="images/hulk.png" />

## I am Flash

```js
log("{red; italic}I am flash");
```

<img src="images/flash.png" />

## I AM A UNICORN

```js
log("I am a {red}u{green}N{blue}i{yellow}C{magenta}o{cyan}R{white}N");
```

<img src="images/unicorn.png" />

## Usage

```js
const parse = require("console.unicorn");

const [placeholder, ...styles] = parse("{red; italic}I am flash");

console.log.apply(console, [placeholder, ...styles, ...args]);
```
