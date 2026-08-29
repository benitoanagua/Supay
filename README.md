# STRATA Design System

STRATA is a contemporary editorial design system for mobile-first interfaces. Its visual language combines classic newspaper discipline with contemporary magazine clarity.

## Core laws

- **Monochrome establishes structure.**
- **Color establishes meaning.** Spectrum is reserved for semantic contrast: red, orange, yellow, green, blue, indigo and violet.
- **Typography leads hierarchy.** Source Sans 3 is the interface family; Source Code Pro is reserved for data and numeric alignment.
- **Physical scale determines structural weight.** `micro → small → medium → large → hero` controls radius, border and elevation monotonically.
- **Semantic importance never overrides physical scale.**
- **Carbon Icons via Iconify is the only icon collection.** Use `iconify-icon` with `carbon:*` names.

## Architecture

```text
apps/storybook
packages/tokens
packages/core
packages/components
packages/testing
tooling
docs
tests
```

## Commands

```bash
pnpm install
pnpm storybook
pnpm check
pnpm test:visual
pnpm test:a11y
pnpm migrate:legacy ./path/to/legacy/source
```

## Legacy migration

New code must use `strata-*`. Historical `wc-*` tags are available only through the compatibility bridge and are deprecated. The migration helper replaces canonical `wc-*` tags in HTML/JS/TS/JSX/TSX files without rewriting arbitrary strings.

See `docs/LEGACY-MIGRATION.md` and `docs/COMPONENT-CATALOG.md`.
