import { describe, expect, it } from "vitest";
import { STRATA_COMPONENT_CATALOG } from "@strata/components";

describe("STRATA component catalog", () => {
  it("contains more than 30 canonical components", () => {
    expect(STRATA_COMPONENT_CATALOG.length).toBeGreaterThanOrEqual(30);
  });

  it("uses only strata component names", () => {
    expect(STRATA_COMPONENT_CATALOG.every((name) => !name.startsWith("wc-"))).toBe(true);
  });
});
