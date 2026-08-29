export type StrataSize = 'micro' | 'small' | 'medium' | 'large' | 'hero';
export type StrataEmphasis = 'low' | 'medium' | 'high';
export type StrataSurface = 'flat' | 'raised' | 'outlined';
export type StrataState = 'default' | 'hover' | 'pressed' | 'focus' | 'selected' | 'disabled' | 'loading' | 'error' | 'warning' | 'success';

export const STRATA_SCALE_ORDER: readonly StrataSize[] = ['micro', 'small', 'medium', 'large', 'hero'];

export const STRATA_SCALE_LAW: Record<StrataSize, { radius: number; border: number; elevation: number }> = {
  micro: { radius: 0, border: 0, elevation: 0 },
  small: { radius: 2, border: 1, elevation: 0 },
  medium: { radius: 6, border: 1.5, elevation: 2 },
  large: { radius: 12, border: 2, elevation: 4 },
  hero: { radius: 20, border: 3, elevation: 8 },
};

export function strataGeometry(size: StrataSize) {
  return STRATA_SCALE_LAW[size];
}

export function assertStrataScaleLaw(): void {
  for (let i = 1; i < STRATA_SCALE_ORDER.length; i += 1) {
    const previous = STRATA_SCALE_LAW[STRATA_SCALE_ORDER[i - 1]];
    const current = STRATA_SCALE_LAW[STRATA_SCALE_ORDER[i]];
    if (current.radius <= previous.radius && current.border <= previous.border && current.elevation <= previous.elevation) {
      throw new Error(`STRATA Scale Law requires increasing structural weight: ${STRATA_SCALE_ORDER[i - 1]} → ${STRATA_SCALE_ORDER[i]}`);
    }
  }
}

export * from './theme.js';
