# Contributing

Thanks for contributing to `possessive-js`.

## Prerequisites

- Node.js 18 or newer
- npm

## Setup

```bash
npm ci
```

## Development Commands

```bash
npm run format
npm run lint
npm run changelog
npm run test:coverage
npm run docs
npm run build
npm run release:patch
npm run release:minor
npm run release:version -- 0.2.1
npm run verify
```

What they do:

- `format`: formats source, tests, docs, and package metadata with Biome.
- `lint`: runs Biome lint checks.
- `test:coverage`: runs Jest with enforced 100% coverage thresholds.
- `changelog`: updates the most recent release section in `CHANGELOG.md` from Conventional Commits.
- `docs`: regenerates the API reference from JSDoc in `src/index.js`.
- `build`: creates the CommonJS and ESM bundles in `dist/`.
- `verify`: runs the full pre-release validation flow.
- `release:*`: runs the manual release flow and creates a tag only when explicitly invoked.

## Contribution Guidelines

- Keep the public API small and explicit.
- Update JSDoc when changing public behavior.
- Regenerate `docs/API.md` after changing public comments or signatures.
- Add or update tests for every behavior change.
- Preserve the package’s ESM-first documentation stance.
- Do not weaken the coverage thresholds.

## Pull Requests

Before opening a pull request:

1. Run `npm run verify`.
2. Review the generated docs if you changed public APIs or comments.
3. Run `npm run changelog` and review `CHANGELOG.md` when user-facing behavior changes.
4. Keep commits focused and explain any breaking change clearly.

## Local Hooks

This repo uses Husky:

- `pre-commit`: runs `lint-staged`, which formats and lints staged files only.
- `pre-push`: runs `npm run verify`.

This keeps normal commits fast while still blocking broken pushes.

## Release Notes

- Breaking changes should be called out explicitly in `CHANGELOG.md`.
- This project is currently in `0.x`, so minor releases may include breaking changes.
- Normal commits must not create tags. Tags are reserved for explicit releases only.
