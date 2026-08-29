# STRATA Iconography

STRATA deliberately does not invent an icon abstraction.

- Renderer: `iconify-icon`.
- Allowed collection: `@iconify-json/carbon`.
- Icon names use the native `carbon:*` namespace.
- No Material, Lucide, Font Awesome, Tabler, Fluent or other collection is permitted.
- Icons use `currentColor` and inherit semantic text/status color.
- Decorative icons must be `aria-hidden="true"`.
- Interactive icons require an accessible label.
- Mobile interactive icon targets default to 48px; the glyph itself remains visually proportional to the component size.
- STRATA components should not expose arbitrary stroke-width, path or color controls.

The local Carbon collection is registered at build/runtime startup to avoid depending on the public Iconify API for application rendering. Iconify supports local icon data through its icon component APIs, and Carbon is an Iconify collection maintained as open icon data. See the project references for details.
