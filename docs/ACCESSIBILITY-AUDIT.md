# STRATA — Auditoría profunda de accesibilidad

## Cerrado

- Foco visible consistente para controles interactivos mediante `:focus-visible`.
- Dialog con nombre accesible, `aria-modal`, foco inicial, retorno del foco y ciclo de `Tab`.
- Modal con identificador de título único y ciclo de foco.
- Drawer y BottomSheet exponen semántica de diálogo y cierre por Escape.
- Switch tiene nombre accesible y estado nativo `disabled`.
- Avatar sin nombre accesible deja de anunciarse como imagen.
- Tabs usan relación `aria-controls`/`tabpanel` y roving tabindex.
- Iconos decorativos se mantienen `aria-hidden`.
- Animaciones respetan `prefers-reduced-motion`.

## Límites

La auditoría automática con axe debe ejecutarse contra todas las historias en CI. Los componentes cuyo contenido depende de slots requieren además validación con contenido real del consumidor.
