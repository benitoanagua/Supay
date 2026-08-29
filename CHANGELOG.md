# Changelog

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
