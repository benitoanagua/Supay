# Testing

## Install

```bash
pnpm install
pnpm approve-builds
```

Approve `esbuild` when pnpm asks for build-script permissions.

## Unit and integration tests

```bash
pnpm test
```

Run in watch mode:

```bash
pnpm test:watch
```

Generate coverage:

```bash
pnpm test:coverage
```

## Type checking and formatting

```bash
pnpm type-check
pnpm prettier:check
pnpm lint
```

## Production and Storybook validation

```bash
pnpm build
pnpm build-storybook
pnpm storybook --no-open
```

Tests use Vitest + jsdom and cover registration, rendering, public properties, accessibility semantics, events, keyboard interaction, state transitions, modal behavior, carousel navigation, theme persistence, and component composition.
