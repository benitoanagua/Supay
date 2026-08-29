import { describe, expect, it, vi } from "vitest";
import { WcAccordion, WcAccordionItem } from "../src/elements/Accordion/Accordion.js";
import "../src/elements/Accordion/AccordionItem.js";
import { WcButton } from "../src/elements/Button/Button.js";
import { WcCard } from "../src/elements/Card/Card.js";
import { WcCarousel, WcCarouselItem } from "../src/elements/Carousel/Carousel.js";
import { WcGrille, WcGrilleItem } from "../src/elements/Grille/Grille.js";
import { WcLogo } from "../src/elements/Logo/Logo.js";
import { WcModal } from "../src/elements/Modal/Modal.js";
import { WcOverlay } from "../src/elements/Overlay/Overlay.js";
import { WcTab } from "../src/elements/Tab/Tab.js";
import { WcTabPanel } from "../src/elements/Tab/TabPanel.js";
import { WcTabs } from "../src/elements/Tab/Tabs.js";
import { WcThemeToggle } from "../src/elements/ThemeToggle/ThemeToggle.js";
import "../src/main.ts";

const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

const mount = <T extends HTMLElement>(element: T) => {
  document.body.appendChild(element);
  return element;
};

describe("component registration", () => {
  it("registers every public custom element", () => {
    const names = [
      "wc-accordion",
      "wc-accordion-item",
      "wc-button",
      "wc-card",
      "wc-carousel",
      "wc-carousel-item",
      "wc-grille",
      "wc-grille-item",
      "wc-logo",
      "wc-modal",
      "wc-overlay",
      "wc-tab",
      "wc-tab-panel",
      "wc-tabs",
      "wc-theme-toggle",
    ];

    for (const name of names) {
      expect(customElements.get(name)).toBeDefined();
    }
  });
});

describe("wc-button", () => {
  it("renders a labeled button with its default state", async () => {
    const button = mount(new WcButton());
    button.label = "Save";
    await button.updateComplete;

    const rendered = button.querySelector("button");
    expect(rendered?.textContent).toContain("Save");
    expect(rendered?.disabled).toBe(false);
    expect(rendered?.getAttribute("aria-label")).toBe("Save");
  });

  it("renders an anchor when href is provided", async () => {
    const button = mount(new WcButton());
    button.label = "Docs";
    button.href = "/docs";
    await button.updateComplete;

    const link = button.querySelector("a");
    expect(link?.getAttribute("href")).toBe("/docs");
    expect(button.querySelector("button")).toBeNull();
  });

  it("disables interaction while loading", async () => {
    const button = mount(new WcButton());
    button.label = "Saving";
    button.loading = true;
    await button.updateComplete;

    const rendered = button.querySelector("button");
    expect(rendered?.disabled).toBe(true);
    expect(button.querySelector(".wc-button__spinner")).not.toBeNull();
  });
});

describe("wc-accordion", () => {
  const createAccordion = (multiple = false) => {
    const accordion = new WcAccordion();
    accordion.multiple = multiple;
    for (let i = 0; i < 3; i++) {
      const item = new WcAccordionItem();
      item.innerHTML = `<span slot="header">Section ${i + 1}</span>Content ${i + 1}`;
      item.open = i === 0;
      accordion.appendChild(item);
    }
    return mount(accordion);
  };

  it("renders items and exposes accordion accessibility state", async () => {
    const accordion = createAccordion();
    await flush();

    const first = accordion.querySelector("wc-accordion-item")! as WcAccordionItem;
    await first.updateComplete;
    const header = first.shadowRoot?.querySelector("button");

    expect(accordion.querySelectorAll("wc-accordion-item")).toHaveLength(3);
    expect(header?.getAttribute("aria-expanded")).toBe("true");
  });

  it("closes the other item in single-open mode", async () => {
    const accordion = createAccordion(false);
    await flush();
    const items = [...accordion.querySelectorAll("wc-accordion-item")] as WcAccordionItem[];
    (items[1].shadowRoot?.querySelector("button") as HTMLButtonElement).click();
    await flush();

    expect(items[0].open).toBe(false);
    expect(items[1].open).toBe(true);
  });

  it("keeps multiple items open when multiple is enabled", async () => {
    const accordion = createAccordion(true);
    await flush();
    const items = [...accordion.querySelectorAll("wc-accordion-item")] as WcAccordionItem[];
    (items[1].shadowRoot?.querySelector("button") as HTMLButtonElement).click();
    await flush();

    expect(items[0].open).toBe(true);
    expect(items[1].open).toBe(true);
  });

  it("does not toggle disabled items", async () => {
    const item = mount(new WcAccordionItem());
    item.disabled = true;
    await item.updateComplete;
    const header = item.shadowRoot?.querySelector("button") as HTMLButtonElement;
    header.click();
    expect(item.open).toBe(false);
    expect(header.disabled).toBe(true);
  });
});

describe("wc-card", () => {
  it("renders title, link and excerpt", async () => {
    const card = mount(new WcCard());
    card.title = "Hello Supay";
    card.url = "/hello";
    card.excerpt = "A short description";
    await card.updateComplete;

    expect(card.querySelector("h4")?.textContent).toBe("Hello Supay");
    expect(card.querySelector(".wc-card__title-link")?.getAttribute("href")).toBe("/hello");
    expect(card.querySelector(".wc-card__excerpt")?.textContent).toContain("A short description");
  });

  it("renders feature image and metadata when configured", async () => {
    const card = mount(new WcCard());
    card.title = "Article";
    card.feature_image = "/image.jpg";
    card.tag_name = "Culture";
    card.published_at = "Today";
    card.reading_time = "5 min";
    await card.updateComplete;

    expect(card.querySelector("img")?.getAttribute("src")).toBe("/image.jpg");
    expect(card.textContent).toContain("Culture");
    expect(card.textContent).toContain("5 min");
  });
});

describe("wc-carousel", () => {
  it("renders slides and hides navigation when all slides fit", async () => {
    const carousel = mount(new WcCarousel());
    carousel.autoPlay = false;
    carousel.desktop = 3;
    for (let i = 0; i < 2; i++) {
      const item = new WcCarouselItem();
      item.textContent = `Slide ${i + 1}`;
      carousel.appendChild(item);
    }
    await flush();

    expect(carousel.querySelectorAll("wc-carousel-item")).toHaveLength(2);
    expect(carousel.shadowRoot?.querySelector(".wc-carousel__arrows")).toBeNull();
  });

  it("emits navigation and change events when next is selected", async () => {
    const carousel = mount(new WcCarousel());
    carousel.autoPlay = false;
    carousel.desktop = 1;
    for (let i = 0; i < 2; i++) carousel.appendChild(new WcCarouselItem());
    await flush();

    const navigation = vi.fn();
    const change = vi.fn();
    carousel.addEventListener("carousel-navigation", navigation);
    carousel.addEventListener("carousel-change", change);

    const next = carousel.shadowRoot?.querySelector(".wc-carousel__arrow--next") as HTMLButtonElement;
    next?.click();
    await flush();

    expect(navigation).toHaveBeenCalled();
    expect(navigation.mock.calls[0][0]).toMatchObject({ detail: { direction: "next" } });
    expect(change).toHaveBeenCalled();
  });
});

describe("wc-grille", () => {
  it("renders its slot and grille items", async () => {
    const grille = mount(new WcGrille());
    grille.desktop = 2;
    const item = new WcGrilleItem();
    item.textContent = "Item";
    grille.appendChild(item);
    await flush();

    expect(grille.shadowRoot?.querySelector(".wc-grille__container")).not.toBeNull();
    expect(grille.querySelector("wc-grille-item")?.textContent).toContain("Item");
  });
});

describe("wc-logo", () => {
  it("renders the SVG logo and applies the default classes", async () => {
    const logo = mount(new WcLogo());
    await logo.updateComplete;

    expect(logo.querySelector("svg")).not.toBeNull();
    expect(logo.classList.contains("inline-flex")).toBe(true);
    expect(logo.classList.contains("h-8")).toBe(true);
  });
});

describe("wc-modal", () => {
  it("opens with dialog semantics and locks body scroll", async () => {
    const modal = mount(new WcModal());
    modal.title = "Confirm";
    modal.open = true;
    await flush();

    expect(modal.shadowRoot?.querySelector('[role="dialog"]')).not.toBeNull();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("closes on Escape and emits before-close", async () => {
    vi.useFakeTimers();
    const modal = mount(new WcModal());
    modal.open = true;
    await flush();
    const beforeClose = vi.fn();
    modal.addEventListener("modal-before-close", beforeClose);

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    vi.advanceTimersByTime(300);
    await flush();

    expect(beforeClose).toHaveBeenCalledTimes(1);
    expect(modal.open).toBe(false);
  });

  it("honors a cancelled before-close event", async () => {
    vi.useFakeTimers();
    const modal = mount(new WcModal());
    modal.open = true;
    await flush();
    modal.addEventListener("modal-before-close", (event) => event.preventDefault());

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    vi.advanceTimersByTime(300);
    await flush();

    expect(modal.open).toBe(true);
  });
});

describe("wc-overlay", () => {
  it("renders title, URL, image and optional metadata", async () => {
    const overlay = mount(new WcOverlay());
    overlay.title = "Featured";
    overlay.url = "/featured";
    overlay.feature_image = "/featured.jpg";
    overlay.tag_name = "Culture";
    overlay.author_name = "Author";
    overlay.show_meta = true;
    await overlay.updateComplete;

    expect(overlay.querySelector(".wc-overlay__title-link")?.getAttribute("href")).toBe("/featured");
    expect(overlay.querySelector(".wc-overlay")?.getAttribute("style")).toContain("/featured.jpg");
    expect(overlay.textContent).toContain("Culture");
    expect(overlay.textContent).toContain("Author");
  });
});

describe("wc-tabs", () => {
  const createTabs = () => {
    const tabs = new WcTabs();
    const tabA = new WcTab();
    const tabB = new WcTab();
    tabA.textContent = "A";
    tabB.textContent = "B";
    tabA.slot = "tabs";
    tabB.slot = "tabs";

    const panelA = new WcTabPanel();
    const panelB = new WcTabPanel();
    panelA.textContent = "Panel A";
    panelB.textContent = "Panel B";
    panelA.slot = "panels";
    panelB.slot = "panels";

    tabs.append(tabA, tabB, panelA, panelB);
    return mount(tabs);
  };

  it("selects the active tab and panel", async () => {
    const tabs = createTabs();
    await flush();
    const tabA = tabs.querySelectorAll("wc-tab")[0] as WcTab;
    const panelA = tabs.querySelectorAll("wc-tab-panel")[0] as WcTabPanel;

    expect(tabA.active).toBe(true);
    expect(panelA.active).toBe(true);
    expect(panelA.style.display).toBe("block");
  });

  it("changes selection on click and emits tab-change", async () => {
    const tabs = createTabs();
    await flush();
    const listener = vi.fn();
    tabs.addEventListener("tab-change", listener);

    const tabB = tabs.querySelectorAll("wc-tab")[1] as WcTab;
    const button = tabB.shadowRoot?.querySelector("button") as HTMLButtonElement;
    button.click();
    await flush();

    expect(tabB.active).toBe(true);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({ detail: { activeTab: 1, previousTab: 0 } }));
  });

  it("supports keyboard navigation", async () => {
    const tabs = createTabs();
    await flush();
    const header = tabs.shadowRoot?.querySelector('[role="tablist"]') as HTMLElement;

    header.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }));
    await flush();

    expect((tabs.querySelectorAll("wc-tab")[1] as WcTab).active).toBe(true);
  });
});

describe("wc-theme-toggle", () => {
  it("loads a saved theme and toggles it", async () => {
    localStorage.setItem("wc-theme", "dark");
    const toggle = mount(new WcThemeToggle());
    await flush();

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(toggle.getAttribute("data-theme")).toBe("dark");

    toggle.shadowRoot?.querySelector("button")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await flush();

    expect(localStorage.getItem("wc-theme")).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("dispatches a global theme-change event", async () => {
    const listener = vi.fn();
    window.addEventListener("theme-change", listener);
    const toggle = mount(new WcThemeToggle());
    await flush();

    toggle.shadowRoot?.querySelector("button")?.click();
    await flush();

    expect(listener).toHaveBeenCalled();
    expect(listener.mock.calls.at(-1)?.[0]).toMatchObject({ detail: { theme: "dark" } });
    window.removeEventListener("theme-change", listener);
  });
});
