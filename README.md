# possessive-js

[![npm version](https://img.shields.io/npm/v/possessive-js)](https://www.npmjs.com/package/possessive-js)
[![npm downloads](https://img.shields.io/npm/dm/possessive-js)](https://www.npmjs.com/package/possessive-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Status](https://github.com/sunanmau5/possessive-js/workflows/CI/badge.svg)](https://github.com/sunanmau5/possessive-js/actions)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A JavaScript library for handling singular possessive apostrophes with support for international names.

## Features

- Handles English possessive rules correctly
- Supports international names (German, French, Nordic)
- Case preservation
- Configurable styles
- Zero dependencies
- Supports both CommonJS and ES Modules
- Tiny bundle size (~8KB)

## Installation

```bash
npm install possessive-js
```

## Usage

```javascript
// ESM
import Possessive from "possessive-js";

// CommonJS
const Possessive = require("possessive-js");

// Basic usage
const possessive = new Possessive();
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

## Configuration

```javascript
const possessive = new Possessive({
  // Use 'alternative' for names ending in 's' to add 's (Chris's)
  // Use 'standard' for just apostrophe (Chris')
  style: "standard",

  // Language-specific rules
  enableFrenchRules: true,
  enableGermanRules: true,
  enableNordicRules: true
});
```

## Special Cases

### German Names

- Names ending in 'ß': `Strauß → Strauß'`
- Names with umlauts: `Müller → Müller's`

### French Names

- Names ending in silent letters: `François → François'`
- Names with accents: `René → René's`

### Nordic Names

- Names with special characters: `Åberg → Åberg's`

## Contributing

Pull requests are welcome! For major changes, please open an issue first.

## License

MIT © Sunan Regi Maunakea
