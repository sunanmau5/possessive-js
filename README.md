# possessive-js

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
