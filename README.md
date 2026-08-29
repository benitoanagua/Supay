# Supay Web Components

Supay is a collection of reusable Web Components built with Lit, Tailwind CSS, Material Design 3, Vite, and Storybook.

## Development

```bash
pnpm install
pnpm storybook
```

## Validation

```bash
pnpm test
pnpm test:coverage
pnpm type-check
pnpm build
pnpm build-storybook
```

## Structure

```text
src/
├── elements/
├── mixins/
├── plugins/
├── scripts/
├── styles/
├── types/
├── main.css
└── main.ts

.storybook/
├── main.ts
└── preview.ts
```

Storybook loads stories directly from `src/` and does not depend on generated static assets.
