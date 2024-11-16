# possessive-js

[![npm version](https://img.shields.io/npm/v/possessive-js)](https://www.npmjs.com/package/possessive-js)
[![npm downloads](https://img.shields.io/npm/dm/possessive-js)](https://www.npmjs.com/package/possessive-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Status](https://github.com/sunanmau5/possessive-js/workflows/CI/badge.svg)](https://github.com/sunanmau5/possessive-js/actions)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A JavaScript library for handling singular possessive apostrophes with support for international names.

## Installation

```bash
npm install possessive-js
```

## Usage

```javascript
const Possessive = require("possessive-js");

const possessive = new Possessive();

// Basic usage
possessive.makePossessive("John"); // => "John's"
possessive.makePossessive("Chris"); // => "Chris'"

// International names
possessive.makePossessive("François"); // => "François'"
possessive.makePossessive("Strauß"); // => "Strauß'"
possessive.makePossessive("Müller"); // => "Müller's"

// Alternative style
const altPossessive = new Possessive({ style: "alternative" });
altPossessive.makePossessive("Chris"); // => "Chris's"
```

## Options

```javascript
const possessive = new Possessive({
  style: "standard", // 'standard' or 'alternative'
  enableFrenchRules: true, // Handle French names
  enableGermanRules: true, // Handle German special characters
  enableNordicRules: true // Handle Nordic special characters
});
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
