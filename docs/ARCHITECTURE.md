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

## Component source of truth

`packages/components/src/elements/index.ts` is the public export boundary and `ComponentCatalog.ts` is the canonical inventory. Storybook consumes those public exports; it does not maintain a second component registry.

Shared behavior belongs in `StrataElement` only when it is genuinely common. Component-specific behavior and styles stay with the component. CSS is split into `component-base.css` plus component-local styles so each shadow-root component does not receive the full system stylesheet. There is no compatibility layer or migration bridge in the production package.
