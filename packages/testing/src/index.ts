import { STRATA_SCALE_LAW, type StrataSize } from "@strata/core";
export function assertScaleLaw(
  size: StrataSize,
  geometry: { radius: number; border: number; elevation: number },
) {
  const expected = STRATA_SCALE_LAW[size];
  if (
    geometry.radius > expected.radius ||
    geometry.border > expected.border ||
    geometry.elevation > expected.elevation
  )
    throw new Error(`STRATA violation: ${size} exceeds its structural weight`);
}
