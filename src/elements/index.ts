// Import all components to register them
import { WcCard } from "./Card.js";
import { WcGrille } from "./Grille.js";
import { WcLogo } from "./Logo.js";
import { WcMenu } from "./Menu.js";
import { WcMenuItem } from "./MenuItem.js";
import { WcOffcanvas } from "./Offcanvas.js";
import { WcSticky } from "./Sticky.js";
import { WcOverlay } from "./Overlay.js";

// Export all components and types
export {
  WcCard,
  WcGrille,
  WcLogo,
  WcMenu,
  WcMenuItem,
  WcOffcanvas,
  WcSticky,
  WcOverlay,
};

// Global type declarations
declare global {
  interface HTMLElementTagNameMap {
    "wc-card": WcCard;
    "wc-grille": WcGrille;
    "wc-logo": WcLogo;
    "wc-menu": WcMenu;
    "wc-menu-item": WcMenuItem;
    "wc-offcanvas": WcOffcanvas;
    "wc-sticky": WcSticky;
    "wc-overlay": WcOverlay;
  }
}
