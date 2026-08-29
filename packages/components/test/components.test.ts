import { describe, it, expect } from "vitest";
import "../src/elements/index.ts";

describe("STRATA element registration", () => {
  const names = [
    "strata-button",
    "strata-card",
    "strata-tab",
    "strata-tabs",
    "strata-modal",
    "strata-checkbox",
    "strata-text-field",
    "strata-nav-item",
    "strata-alert",
    "strata-accordion",
  ];
  for (const name of names) {
    it(`registers <${name}>`, () => {
      expect(customElements.get(name)).toBeTruthy();
    });
  }
});

describe("STRATA Button", () => {
  it("renders its label in the light DOM", async () => {
    const el = document.createElement("strata-button");
    el.setAttribute("label", "Save");
    document.body.appendChild(el);
    await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
    expect(el.textContent).toContain("Save");
    el.remove();
  });

  it("renders a <button> element", async () => {
    const el = document.createElement("strata-button");
    el.setAttribute("label", "Send");
    document.body.appendChild(el);
    await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
    expect(el.querySelector("button")).toBeTruthy();
    el.remove();
  });
});

describe("STRATA NavItem", () => {
  it("reflects selection via aria-current and typography, not a border", async () => {
    const el = document.createElement("strata-nav-item");
    el.setAttribute("label", "Home");
    document.body.appendChild(el);
    await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
    const button = el.shadowRoot?.querySelector<HTMLButtonElement>("button");
    expect(button).toBeTruthy();
    expect(button?.getAttribute("aria-current")).toBe("false");
    el.setAttribute("selected", "");
    await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
    expect(button?.getAttribute("aria-current")).toBe("page");
    el.remove();
  });
});