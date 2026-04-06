# possessive-js

[![npm version](https://img.shields.io/npm/v/possessive-js)](https://www.npmjs.com/package/possessive-js)
[![npm downloads](https://img.shields.io/npm/dm/possessive-js)](https://www.npmjs.com/package/possessive-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Test Status](https://github.com/sunanmau5/possessive-js/workflows/CI/badge.svg)](https://github.com/sunanmau5/possessive-js/actions)

A small JavaScript library for formatting singular possessive forms with predictable English defaults, special-case pronouns, and ESM-first package support.

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
possessive.makePossessive("STRAUSS"); // => "STRAUSS'"

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
  style: "standard",
  enableFrenchRules: true,
  enableGermanRules: true,
  enableNordicRules: true
});
```

Options:

- `style`: `"standard"` or `"alternative"`. Controls whether words ending in `s` become `Chris'` or `Chris's`.
- `enableGermanRules`: when `true`, words ending in `ß` receive a trailing apostrophe, such as `Strauß -> Strauß'`.
- `enableFrenchRules`: reserved for compatibility with future language-specific rules.
- `enableNordicRules`: reserved for compatibility with future language-specific rules.

### `makePossessive(noun)`

Formats a singular noun or name into its possessive form.

Examples:

- `John -> John's`
- `Chris -> Chris'`
- `James -> James'`
- `Strauß -> Strauß'`
- `It -> Its`
- `THEY -> THEIR`

Notes:

- Input is trimmed before formatting.
- Existing possessive strings are not specially detected or normalized.
- Mixed-case inputs are handled conservatively.

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
- Mixed-case inputs are handled conservatively rather than with linguistic inference.

## Development

```bash
npm run format
npm run lint
npm run changelog
npm run docs
npm run release:patch
npm run release:minor
npm run release:version -- 0.2.1
npm run verify
```

`docs` regenerates the API reference from JSDoc comments in `src/index.js`.

`changelog` updates the latest changelog section from Conventional Commit history.

`verify` runs linting, coverage, build, CJS/ESM smoke tests, API docs generation, and a package dry-run.

## Release Workflow

- Normal commits do not create tags.
- `pre-commit` formats and lints staged files through Husky and lint-staged.
- `pre-push` runs `npm run verify` through Husky.
- Tags are created only when you run an explicit release command.

Typical release flow:

```bash
npm run release:patch
```

or

```bash
npm run release:minor
```

or for an exact version:

```bash
npm run release:version -- 0.2.1
```

Those commands run verification first, update `CHANGELOG.md`, bump the version, and create the release tag. Push the release commit and tag explicitly afterward.

## License

MIT © Sunan Regi Maunakea
