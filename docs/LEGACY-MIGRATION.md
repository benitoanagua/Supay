# Legacy migration — Supay/WC → STRATA

STRATA preserves the historical `wc-*` custom-element tags as a temporary compatibility bridge while all new code uses the canonical `strata-*` namespace.

## Canonical mapping

```text
wc-button          → strata-button
wc-card            → strata-card
wc-modal           → strata-modal
wc-tabs            → strata-tabs
wc-theme-toggle    → strata-theme-toggle
...                → ...
```

The bridge is implemented in `packages/components/src/elements/legacy.ts` and is intentionally small: each `wc-*` tag subclasses its corresponding STRATA element. No second implementation is maintained.

## Migration rules

1. New code MUST use `strata-*`.
2. Existing `wc-*` code may continue to work during the migration window.
3. New visual values must use STRATA tokens.
4. Legacy icon classes must migrate to `iconify-icon` with `carbon:*` icons.
5. Product-specific components stay outside the core STRATA catalog.
6. The compatibility bridge is deprecated and may be removed in a future major release.
