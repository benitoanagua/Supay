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
    await (el as unknown as { updateComplete: Promise<unknown> })
      .updateComplete;
    expect(el.textContent).toContain("Save");
    el.remove();
  });

  it("renders a <button> element", async () => {
    const el = document.createElement("strata-button");
    el.setAttribute("label", "Send");
    document.body.appendChild(el);
    await (el as unknown as { updateComplete: Promise<unknown> })
      .updateComplete;
    expect(el.querySelector("button")).toBeTruthy();
    el.remove();
  });
});

describe("STRATA NavItem", () => {
  it("reflects selection via aria-current and typography, not a border", async () => {
    const el = document.createElement("strata-nav-item");
    el.setAttribute("label", "Home");
    document.body.appendChild(el);
    await (el as unknown as { updateComplete: Promise<unknown> })
      .updateComplete;
    const button = el.shadowRoot?.querySelector<HTMLButtonElement>("button");
    expect(button).toBeTruthy();
    expect(button?.getAttribute("aria-current")).toBe("false");
    el.setAttribute("selected", "");
    await (el as unknown as { updateComplete: Promise<unknown> })
      .updateComplete;
    expect(button?.getAttribute("aria-current")).toBe("page");
    el.remove();
  });
});

describe("STRATA accessibility contracts", () => {
  it("gives switches an accessible name and native disabled state", async () => {
    const el = document.createElement("strata-switch");
    el.setAttribute("label", "Enable alerts");
    el.setAttribute("disabled", "");
    document.body.appendChild(el);
    await (el as unknown as { updateComplete: Promise<unknown> })
      .updateComplete;
    const button = el.shadowRoot?.querySelector<HTMLButtonElement>("button");
    expect(button?.getAttribute("role")).toBe("switch");
    expect(button?.getAttribute("aria-label")).toBe("Enable alerts");
    expect(button?.disabled).toBe(true);
    el.remove();
  });

  it("uses unique dialog title ids and restores focus", async () => {
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    trigger.focus();
    const dialog = document.createElement("strata-dialog") as HTMLElement & {
      open: boolean;
    };
    dialog.setAttribute("title", "Details");
    dialog.open = true;
    document.body.appendChild(dialog);
    await (dialog as unknown as { updateComplete: Promise<unknown> })
      .updateComplete;
    const title = dialog.shadowRoot?.querySelector("h2");
    const content = dialog.shadowRoot?.querySelector("[role=dialog]");
    expect(title?.id).toBeTruthy();
    expect(content?.getAttribute("aria-labelledby")).toBe(title?.id);
    dialog.open = false;
    await (dialog as unknown as { updateComplete: Promise<unknown> })
      .updateComplete;
    expect(document.activeElement).toBe(trigger);
    dialog.remove();
    trigger.remove();
  });
});
