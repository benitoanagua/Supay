// Import all components to register them
import { WcAccordion } from "./Accordion/Accordion.js";
import { WcAccordionItem } from "./Accordion/AccordionItem.js";
import { WcCard } from "./Card/Card.js";
import { WcCarousel } from "./Carousel/Carousel.js";
import { WcCarouselItem } from "./Carousel/CarouselItem.js";
import { WcGrille } from "./Grille/Grille.js";
import { WcGrilleItem } from "./Grille/GrilleItem.js";
import { WcLogo } from "./Logo/Logo.js";
import { WcNavbar } from "./Navbar/Navbar.js";
import { WcOffcanvas } from "./Offcanvas/Offcanvas.js";
import { WcOverlay } from "./Overlay/Overlay.js";
import { WcTab } from "./Tab/Tab.js";
import { WcTabPanel } from "./Tab/TabPanel.js";
import { WcTabs } from "./Tab/Tabs.js";
import { WcThemeToggle } from "./ThemeToggle/ThemeToggle.js";

// Export all components and types
export {
  WcAccordion,
  WcAccordionItem,
  WcCard,
  WcCarousel,
  WcCarouselItem,
  WcGrille,
  WcGrilleItem,
  WcLogo,
  WcNavbar,
  WcOffcanvas,
  WcOverlay,
  WcTab,
  WcTabPanel,
  WcTabs,
  WcThemeToggle,
};

// Global type declarations
declare global {
  interface HTMLElementTagNameMap {
    "wc-accordion": WcAccordion;
    "wc-accordion-item": WcAccordionItem;
    "wc-card": WcCard;
    "wc-carousel": WcCarousel;
    "wc-carousel-item": WcCarouselItem;
    "wc-grille": WcGrille;
    "wc-grille-item": WcGrilleItem;
    "wc-logo": WcLogo;
    "wc-navbar": WcNavbar;
    "wc-offcanvas": WcOffcanvas;
    "wc-overlay": WcOverlay;
    "wc-tab": WcTab;
    "wc-tab-panel": WcTabPanel;
    "wc-tabs": WcTabs;
    "wc-theme-toggle": WcThemeToggle;
  }
}
