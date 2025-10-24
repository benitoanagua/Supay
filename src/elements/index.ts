// Import all components to register them
import { WcAccordion } from "./Accordion/Accordion.js";
import { WcAccordionItem } from "./Accordion/AccordionItem.js";
import { WcButton } from "./Button/Button.js";
import { WcCard } from "./Card/Card.js";
import { WcCarousel } from "./Carousel/Carousel.js";
import { WcCarouselItem } from "./Carousel/CarouselItem.js";
import { WcGrille } from "./Grille/Grille.js";
import { WcGrilleItem } from "./Grille/GrilleItem.js";
import { WcLogo } from "./Logo/Logo.js";
import { WcModal } from "./Modal/Modal.js";
import { WcOverlay } from "./Overlay/Overlay.js";
import { WcTab } from "./Tab/Tab.js";
import { WcTabPanel } from "./Tab/TabPanel.js";
import { WcTabs } from "./Tab/Tabs.js";
import { WcThemeToggle } from "./ThemeToggle/ThemeToggle.js";

// Export all components and types
export {
  WcAccordion,
  WcAccordionItem,
  WcButton,
  WcCard,
  WcCarousel,
  WcCarouselItem,
  WcGrille,
  WcGrilleItem,
  WcLogo,
  WcModal,
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
    "wc-button": WcButton;
    "wc-card": WcCard;
    "wc-carousel": WcCarousel;
    "wc-carousel-item": WcCarouselItem;
    "wc-grille": WcGrille;
    "wc-grille-item": WcGrilleItem;
    "wc-logo": WcLogo;
    "wc-modal": WcModal;
    "wc-overlay": WcOverlay;
    "wc-tab": WcTab;
    "wc-tab-panel": WcTabPanel;
    "wc-tabs": WcTabs;
    "wc-theme-toggle": WcThemeToggle;
  }
}
