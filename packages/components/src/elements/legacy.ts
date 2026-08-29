/**
 * Legacy compatibility bridge for Supay/WC consumers.
 * New code must use strata-* elements. Remove these aliases in the next major release.
 */
import { StrataAccordion } from "./Accordion/Accordion.js";
import { StrataAccordionItem } from "./Accordion/AccordionItem.js";
import { StrataButton } from "./Button/Button.js";
import { StrataCard } from "./Card/Card.js";
import { StrataCarousel } from "./Carousel/Carousel.js";
import { StrataCarouselItem } from "./Carousel/CarouselItem.js";
import { StrataGrille } from "./Grille/Grille.js";
import { StrataGrilleItem } from "./Grille/GrilleItem.js";
import { StrataLogo } from "./Logo/Logo.js";
import { StrataModal } from "./Modal/Modal.js";
import { StrataOverlay } from "./Overlay/Overlay.js";
import { StrataTab } from "./Tab/Tab.js";
import { StrataTabPanel } from "./Tab/TabPanel.js";
import { StrataTabs } from "./Tab/Tabs.js";
import { StrataThemeToggle } from "./ThemeToggle/ThemeToggle.js";

const aliases: Record<string, CustomElementConstructor> = {
  "wc-accordion": class extends StrataAccordion {},
  "wc-accordion-item": class extends StrataAccordionItem {},
  "wc-button": class extends StrataButton {},
  "wc-card": class extends StrataCard {},
  "wc-carousel": class extends StrataCarousel {},
  "wc-carousel-item": class extends StrataCarouselItem {},
  "wc-grille": class extends StrataGrille {},
  "wc-grille-item": class extends StrataGrilleItem {},
  "wc-logo": class extends StrataLogo {},
  "wc-modal": class extends StrataModal {},
  "wc-overlay": class extends StrataOverlay {},
  "wc-tab": class extends StrataTab {},
  "wc-tab-panel": class extends StrataTabPanel {},
  "wc-tabs": class extends StrataTabs {},
  "wc-theme-toggle": class extends StrataThemeToggle {},
};

for (const [name, ctor] of Object.entries(aliases)) {
  if (!customElements.get(name)) customElements.define(name, ctor);
}
