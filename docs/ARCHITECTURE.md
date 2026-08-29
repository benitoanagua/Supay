# STRATA architecture

STRATA is a pnpm + Turborepo monorepo. The design system is deliberately layered without unnecessary abstraction.

```text
@strata/tokens
      ↓
@strata/core
      ↓
@strata/components
      ↓
apps/storybook
      ↓
@strata/testing
```

## Packages

- `@strata/tokens`: primitive and semantic design tokens, CSS output, typography and spectrum.
- `@strata/core`: shared type contracts, theme utilities and the Scale Law.
- `@strata/components`: Lit Web Components and their stories.
- `@strata/testing`: contract, accessibility and visual tests.

## Icons

There is intentionally no `@strata/icons` abstraction. Components use `iconify-icon` directly. `@iconify-json/carbon` is the only permitted collection.

## Storybook

Storybook is the living catalogue and visual documentation layer. It consumes the published package boundaries rather than becoming the implementation itself.
