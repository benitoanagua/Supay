# STRATA testing

STRATA treats design rules as testable contracts.

## Commands

```bash
pnpm test                 # unit + contract tests
pnpm test:visual          # Playwright visual regression
pnpm test:visual:update   # intentionally update visual baselines
pnpm test:a11y            # axe accessibility checks
pnpm audit                # tokens + design laws + icon policy
```

## Visual regression

Baselines live beside the Playwright test suite under `__screenshots__/`. A visual change must be intentional and reviewed. The baseline command is never used by CI.

## Accessibility

Critical axe violations fail CI. Keyboard/focus behavior should also be represented in component stories.
