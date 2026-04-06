# possessive-js

[![npm version](https://img.shields.io/npm/v/possessive-js)](https://www.npmjs.com/package/possessive-js)
[![npm downloads](https://img.shields.io/npm/dm/possessive-js)](https://www.npmjs.com/package/possessive-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Status](https://github.com/sunanmau5/possessive-js/workflows/CI/badge.svg)](https://github.com/sunanmau5/possessive-js/actions)

A small JavaScript library for formatting singular English possessive forms with predictable defaults and ESM-first package support.

## Features

- Small public API
- ESM-first usage and package exports
- Singular possessive formatting for common English cases
- Configurable handling for words ending in `s`
- Special-case pronoun exceptions such as `it -> its`
- Case-preserving output for lowercase, uppercase, and title-case inputs
- Published TypeScript declarations
- Zero runtime dependencies

## Installation

```bash
npm install possessive-js
```

Requires Node.js 18 or newer.

## Usage

```javascript
import Possessive from "possessive-js";

const possessive = new Possessive();

possessive.makePossessive("John"); // => "John's"
possessive.makePossessive("Chris"); // => "Chris'"
possessive.makePossessive("It"); // => "Its"
possessive.makePossessive("Strauss"); // => "Strauss'"

const alternative = new Possessive({ style: "alternative" });
alternative.makePossessive("Chris"); // => "Chris's"
```

CommonJS compatibility:

```javascript
const Possessive = require("possessive-js");

const possessive = new Possessive();
possessive.makePossessive("John"); // => "John's"
```

## API

Generated API reference: [`docs/API.md`](./docs/API.md)

### `new Possessive(options?)`

```javascript
const possessive = new Possessive({
  style: "standard"
});
```

Options:

- `style`: `"standard"` or `"alternative"`. Controls whether words ending in `s` become `Chris'` or `Chris's`.

### `makePossessive(noun)`

Formats a singular noun or name into its possessive form.

Examples:

- `John -> John's`
- `Chris -> Chris'`
- `James -> James'`
- `Strauss -> Strauss'`
- `It -> Its`
- `THEY -> THEIR`

Notes:

- Input is trimmed before formatting.
- Custom exceptions take precedence over the built-in suffix rules.
- Existing possessive strings are not specially detected or normalized.
- Mixed-case inputs are handled conservatively.
- The package is intentionally English-only.

### Real-World Use Cases

- Generated UI labels: `${possessive.makePossessive(companyName)} settings`
- Profile and ownership pages: `${possessive.makePossessive(userName)} dashboard`
- CMS and publishing systems generating titles from author or organization names
- Emails, exports, and PDFs that need the same possessive formatting rules as the main app

### `addException(noun, possessiveForm)`

Registers a custom exact-word exception before suffix rules are applied.

```javascript
const possessive = new Possessive();
possessive.addException("boss", "bosses'");

possessive.makePossessive("boss"); // => "bosses'"
possessive.makePossessive("Boss"); // => "Bosses'"
possessive.makePossessive("BOSS"); // => "BOSSES'"
```

## Non-goals

- Plural possessives are out of scope.
- The library does not attempt full grammar or language detection.
- Non-English language support is out of scope.
- Mixed-case inputs are handled conservatively rather than with linguistic inference.

If your product localizes beyond English, use this package only for the English slice of that localization system.

## Development

```bash
npm run format
npm run lint
npm run changelog
npm run docs
npm run verify
```

`docs` regenerates the API reference from JSDoc comments in `src/index.js`.

`changelog` generates draft release notes from Conventional Commit history. Review and edit the result manually before committing it.

`verify` runs linting, coverage, build, CJS/ESM smoke tests, API docs generation, and a package dry-run.

## License

MIT © Sunan Regi Maunakea
