import type { Page } from "@playwright/test";

/** Wait until Lit/Web Components in the story have completed their first render. */
export async function waitForStoryReady(page: Page): Promise<void> {
  await page.waitForFunction(async () => {
    const elements: Element[] = [];
    const visit = (root: Document | ShadowRoot | Element) => {
      const children = root.querySelectorAll("*");
      children.forEach((element) => {
        elements.push(element);
        if (element.shadowRoot) visit(element.shadowRoot);
      });
    };

    visit(document);
    await Promise.all(
      elements.map((element) => {
        const candidate = element as Element & {
          updateComplete?: Promise<unknown>;
        };
        return candidate.updateComplete ?? Promise.resolve();
      }),
    );

    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    return true;
  });
}
