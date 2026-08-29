# STRATA Component Contract

Every public component must define:

1. Purpose and anatomy.
2. Public properties/events.
3. Size and supported states.
4. Token usage only; no product hardcoded colors/radii/elevation.
5. Accessibility semantics and keyboard behavior.
6. Responsive/mobile behavior.
7. Storybook story with default, states and edge cases.
8. Unit/contract test.
9. Visual regression coverage when geometry or interaction is visual.

## Mandatory structural rule

`micro → small → medium → large → hero` must be monotonic for radius, border capacity and elevation.

A component may choose `border: 0` for a particular variant, but it may not use a structural treatment heavier than its declared size.

## Navigation

Selected navigation is communicated with color, typography and/or surface change. Do not add a decorative selected border.

## Icons

Use `iconify-icon` directly. `@iconify-json/carbon` is the only allowed collection. Do not introduce a second icon library or a STRATA icon registry unless an RFC is approved.
