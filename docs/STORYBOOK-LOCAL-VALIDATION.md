# Validación local de Storybook

La migración a Web Components + Lit requiere regenerar `pnpm-lock.yaml` en un entorno con acceso al registry porque el entorno de reparación no tiene `pnpm` ni acceso al registry de npm.

Ejecutar:

```bash
pnpm install
pnpm build
pnpm storybook --no-open
```

Verificar manualmente:

- `Components / ButtonGroup / Default`
- `Components / Tabs / Structural`
- `Components / ThemeToggle / Structural`
- `Components / Card / Structural Scale`
- `Components / Modal / Structural`
- `Components / Carousel / Structural`

No debe aparecer `[object HTMLElement]`.

Después ejecutar:

```bash
pnpm typecheck
pnpm test
pnpm build:storybook
pnpm test:a11y
pnpm test:visual
pnpm check
pnpm test:all
```

La validación de Shadow DOM está cubierta adicionalmente por los smoke tests de Playwright.
