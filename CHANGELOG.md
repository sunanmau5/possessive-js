## [0.2.1](https://github.com/sunanmau5/possessive-js/compare/v0.2.0...v0.2.1) (2026-04-06)


### Bug Fixes

* decouple tests from build output ([2dcb27a](https://github.com/sunanmau5/possessive-js/commit/2dcb27a7fbb9e2d0501fb0e3b6343b27a7725324))
* track smoke test fixtures ([23ba7b1](https://github.com/sunanmau5/possessive-js/commit/23ba7b17eceba16826ab082156d156bb4e3b52c4))

# Changelog

All notable changes to this project will be documented in this file.

The changelog is generated from Conventional Commits and then reviewed manually for release quality. While the package is in `0.x`, minor releases may include breaking changes.

## [0.2.0] - 2026-04-06

### Added

- Published TypeScript declarations via `index.d.ts`.
- Biome-based formatting and linting scripts.
- Generated API reference in `docs/API.md` from source JSDoc.
- Stronger verification workflow covering lint, coverage, build, smoke tests, docs generation, and package dry-run.
- CI matrix for Node.js 18, 20, and 22.

### Changed

- Reworked the possessive formatter into a smaller, explicit rule pipeline.
- Improved case preservation for built-in exception words.
- Tightened option validation for constructor inputs.
- Updated README to be ESM-first and aligned with actual package behavior.

### Breaking Changes

- Node.js support is now `>=18`.
- Exception casing behavior changed for title-case inputs such as `It -> Its` and `She -> Her`.
- Invalid constructor option types now throw instead of being loosely accepted.
- `addException()` now normalizes stored values to keep exception-case handling consistent.

## [0.1.0] - 2024-11-16

### Added

- Initial release of `possessive-js`.
