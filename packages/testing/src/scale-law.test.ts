import { describe, expect, it } from "vitest";
import { assertStrataScaleLaw } from "@strata/core";

describe("STRATA Scale Law", () => {
  it("is structurally monotonic", () => {
    expect(() => assertStrataScaleLaw()).not.toThrow();
  });
});
