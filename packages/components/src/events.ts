export function emitValueEvent<T>(
  target: EventTarget,
  type: "strata-input" | "strata-change",
  value: T,
): void {
  target.dispatchEvent(
    new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail: { value },
    }),
  );
}
