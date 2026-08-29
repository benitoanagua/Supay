
## Interactive value contract

Form controls expose their value through the public `value`/`checked` property and emit `strata-input` while editing and `strata-change` when the value is committed. Event details use `{ value }` and events bubble across shadow boundaries.

Stateful components reflect externally meaningful boolean state through HTML attributes where applicable (`disabled`, `open`, `checked`, `active`) and expose corresponding ARIA state in their interactive controls.

Modal body-scroll management preserves and restores the caller's previous `overflow` value. Escape handling follows the live `close-on-escape` property rather than only its initial value.
