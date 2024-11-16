const Possessive = require("./dist/index.js");

const possessive = new Possessive();
console.log(possessive.makePossessive("John")); // Should output: John's
console.log(possessive.makePossessive("Chris")); // Should output: Chris'
