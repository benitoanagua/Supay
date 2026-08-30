# Storybook — Arquitectura actual

STRATA usa el renderer nativo de Web Components de Storybook con Vite.

## Renderer

- Framework: `@storybook/web-components-vite`.
- Renderer: `@storybook/web-components`.
- Templates: tagged template literals de Lit mediante `html` de `lit`.
- Los componentes se escriben como custom elements (`<strata-button>`, `<strata-tabs>`, etc.).
- Las stories que necesitan propiedades JavaScript usan bindings de Lit (`.property=${value}`) y las que necesitan estados booleanos usan property bindings (`.disabled=${value}`), evitando convertir objetos o booleanos complejos en strings.

La configuración sigue el framework oficial de Storybook para Web Components + Vite. urlDocumentación oficial de Storybook para Web Components + Vitehttps://storybook.js.org/docs/get-started/frameworks/web-components-vite

## Shadow DOM

Los componentes conservan su Shadow DOM. Storybook no debe intentar copiar sus estilos internos al documento ni eliminar el Shadow Root.

El renderer recibe directamente el `TemplateResult` de Lit y monta el resultado como contenido de la story. Esto evita convertir un `HTMLElement` en texto (`[object HTMLElement]`).

Las pruebas de Playwright esperan además `updateComplete` de los custom elements antes de realizar aserciones visuales o de accesibilidad.

## Stories

Una story canónica debe seguir este patrón:

```ts
import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta = {
  title: "Components/Button",
  component: "strata-button",
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Structural: Story = {
  render: () => html`
    <strata-button label="Primary"></strata-button>
  `,
};
```

No se debe usar `document.createElement()` como mecanismo principal de render de una story. Es preferible `html` de Lit para conservar el renderer nativo y hacer explícitos los bindings.

## Contenido de componentes contenedores

Un componente que solamente renderiza un `<slot>` no debe tener una story vacía. Por ejemplo, `strata-button-group` debe mostrar botones hijos; `strata-list` debe mostrar `strata-list-item`; `strata-menu` debe mostrar `strata-menu-item`.

## Validación

La suite visual contiene pruebas específicas que comprueban que los componentes se montan y que su contenido interno del Shadow DOM es accesible mediante Playwright.
