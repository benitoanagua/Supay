# STRATA — Auditoría final de arquitectura interna

## Principios
1. Tokens son la única fuente de valores de diseño.
2. `StrataElement` concentra comportamiento y estilos verdaderamente compartidos.
3. Cada componente mantiene su CSS específico junto a su implementación.
4. No existe una capa Tailwind ni utilidades visuales.
5. No existe bridge legacy ni código de compatibilidad sin consumidores.
6. Los eventos públicos usan `bubbles: true` y `composed: true` cuando deben cruzar Shadow DOM.

## Correcciones
- Eliminada inyección de estilos `theme-vars` sin consumidor.
- Eliminado listener `resize` anónimo que no podía ser removido en `Grille`.
- Eliminados tipos `any` innecesarios en hooks de actualización.
- Centralizado foco visible en `component-base.css`.
- Catálogo y API pública se mantienen separados de las implementaciones internas.

## Deuda aceptable
`TitleRendererMixin` conserva un genérico de constructor porque implementa una fábrica reutilizable; no contiene estado global ni efectos laterales.
