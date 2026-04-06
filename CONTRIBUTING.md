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
npm run verify
```

What they do:

- `format`: formats source, tests, docs, and package metadata with Biome.
- `lint`: runs Biome lint checks.
- `test:coverage`: runs Jest with enforced 100% coverage thresholds.
- `changelog`: generates draft release notes from Conventional Commits. Review and edit the file manually afterward.
- `docs`: regenerates the API reference from JSDoc in `src/index.js`.
- `build`: creates the CommonJS and ESM bundles in `dist/`.
- `verify`: runs the full pre-release validation flow.

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
3. Update `CHANGELOG.md` manually when user-facing behavior changes.
4. Use `npm run changelog` only as a draft generator if helpful.
5. Keep commits focused and explain any breaking change clearly.

## Local Hooks

This repo uses Husky:

- `pre-commit`: runs `lint-staged`, which formats and lints staged files only.
- `pre-push`: runs `npm run verify`.

This keeps normal commits fast while still blocking broken pushes.

## Maintainer Notes

- Breaking changes should be called out explicitly in `CHANGELOG.md`.
- This project is currently in `0.x`, so minor releases may include breaking changes.
- Release mechanics and tagging policy are maintainer concerns and are intentionally omitted from the public README.
