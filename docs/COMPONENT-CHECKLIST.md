# STRATA component checklist

Before a component is considered stable:

- [ ] Uses semantic STRATA tokens; no hardcoded visual tokens.
- [ ] Declares physical `size` where the Scale Law applies.
- [ ] Geometry follows `micro → small → medium → large → hero`.
- [ ] Border is optional and justified by structure.
- [ ] Selected navigation uses color/typography, never a decorative border.
- [ ] Uses Source Sans 3 for UI and Source Code Pro only for numeric/data contexts.
- [ ] Uses Carbon icons only (`carbon:*`) through `iconify-icon`.
- [ ] Defines supported interaction states.
- [ ] Has keyboard/focus semantics where interactive.
- [ ] Has an accessible name where required.
- [ ] Supports reduced motion.
- [ ] Has a Storybook story with mobile viewport coverage.
- [ ] Has unit/contract coverage.
- [ ] Has an accessibility check when interactive.
- [ ] Has visual regression coverage when visual geometry matters.
- [ ] Has documentation for anatomy, API, states and usage.
