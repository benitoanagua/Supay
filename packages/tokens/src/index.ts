import tokens from "./tokens.json" with { type: "json" };
export { tokens };
export type StrataSize = keyof typeof tokens.scale;
export type StrataSpectrum = keyof typeof tokens.spectrum;
