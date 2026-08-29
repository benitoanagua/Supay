# STRATA agent guardrails

These rules are constraints, not suggestions.

1. Do not invent visual values when a STRATA token exists.
2. Do not add decorative borders to every component.
3. Apply the Scale Law to physical component size: larger components may carry more radius, border and elevation; smaller components must not use heavier structural treatment than their scale permits.
4. Do not use semantic importance to bypass the Scale Law.
5. Selected navigation is expressed with color/typography, not a decorative border.
6. Monochrome is the default visual language. Spectrum colors are semantic and restrained.
7. The only permitted icon collection is `@iconify-json/carbon`, used as `carbon:*` through `iconify-icon`.
8. Source Sans 3 is the default UI typeface. Source Code Pro is reserved for numeric/data contexts.
9. Prefer editorial hierarchy, whitespace and dividers before adding another container.
10. Every new component requires a Storybook story and tests appropriate to its behavior.
