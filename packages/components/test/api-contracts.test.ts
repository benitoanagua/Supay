import { describe, expect, it } from "vitest";
import "../src/elements/index.ts";

const waitForUpdate = (element: Element) =>
  (element as unknown as { updateComplete: Promise<unknown> }).updateComplete;

describe("STRATA value controls", () => {
  it("emits semantic input and change events from text field", async () => {
    const field = document.createElement("strata-text-field") as HTMLElement & { value: string };
    document.body.appendChild(field);
    await waitForUpdate(field);

    const events: string[] = [];
    field.addEventListener("strata-input", () => events.push("input"));
    field.addEventListener("strata-change", () => events.push("change"));

    const input = field.shadowRoot?.querySelector("input") as HTMLInputElement;
    input.value = "hello";
    input.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    input.dispatchEvent(new Event("change", { bubbles: true, composed: true }));

    expect(field.value).toBe("hello");
    expect(events).toEqual(["input", "change"]);
    field.remove();
  });

  it("keeps switch state reflected and emits both value events", async () => {
    const control = document.createElement("strata-switch") as HTMLElement & { checked: boolean };
    document.body.appendChild(control);
    await waitForUpdate(control);
    const events: string[] = [];
    control.addEventListener("strata-input", () => events.push("input"));
    control.addEventListener("strata-change", () => events.push("change"));

    control.shadowRoot?.querySelector("button")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    expect(control.checked).toBe(true);
    expect(control.hasAttribute("checked")).toBe(true);
    expect(events).toEqual(["input", "change"]);
    control.remove();
  });
});

describe("STRATA modal contract", () => {
  it("does not erase a pre-existing body overflow value", async () => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "scroll";
    const modal = document.createElement("strata-modal") as HTMLElement & { open: boolean };
    document.body.appendChild(modal);
    await waitForUpdate(modal);
    modal.open = true;
    await waitForUpdate(modal);
    modal.open = false;
    await waitForUpdate(modal);
    expect(document.body.style.overflow).toBe("scroll");
    modal.remove();
    document.body.style.overflow = previous;
  });
});
