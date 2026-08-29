/** Carbon is the only icon collection allowed by STRATA. */
export type StrataIconName = `carbon:${string}`;

export function isStrataCarbonIcon(value: string): value is StrataIconName {
  return value.startsWith('carbon:') && value.length > 'carbon:'.length;
}
