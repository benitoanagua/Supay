# Changelog

## 2.5.1

### Fixed
- Typecheck: corrected global element type map and item-component exports in `packages/components`.
- Legacy bridge imports point to the correct item modules (`AccordionItem`, `CarouselItem`, `GrilleItem`, `TabPanel`, `Tabs`, `ListItem`).
- `ThemeAwareMixin` no longer imports the missing `types/material` module; theme vars are defined locally.
- `@strata/components` now emits declaration files via `vite-plugin-dts` so downstream packages typecheck against a real `types` entry.
- Tokens: added missing semantic tokens (`actionPrimary`, `surfaceDefault`, `surfaceSubtle`) and standardized gray naming (`gray-100`). All tokens referenced in code are now defined in the single source of truth.
- `Divider`/`StrataFoundation` use scale-border tokens instead of an undefined `--strata-border-thin`; `divider-double` token reference corrected.
- Theme colors used by Accordion/Carousel/Modal/Overlay map to STRATA tokens via a Tailwind `@theme` block.
- Component unit tests added (element registration + Button/NavItem behavior) under jsdom.
- Playwright runs against the Storybook iframe and uses a Chromium mobile project (works without WebKit system deps); visual baselines established and passing.
- Storybook build fixed by removing the tokens src alias that broke the `styles.css` subpath.
- Removed the dead root `.storybook` (legacy `supay-elements` reference).

### Added
- GitHub Actions CI covering audit, lint, typecheck, unit tests, build, Storybook build, a11y, visual regression and Changesets.
- `.changeset/config.json`.

## 2.5.0

### Added
- Expanded the canonical STRATA catalog to 48 component/element entries.
- Added form, navigation, feedback, overlay, data and content primitives.
- Added component catalog registry and Storybook overview.
- Added conservative `wc-*` → `strata-*` migration codemod.
- Added legacy compatibility bridge with one implementation per component.
- Added legacy audit to CI/tooling.

### Changed
- `strata-*` is the canonical namespace.
- `wc-*` is compatibility-only and deprecated.
- Carbon via `iconify-icon` remains the only permitted icon collection.
- All new components consume STRATA tokens and Scale Law geometry.
