// Import all components to register them
import { WcCard } from "./Card.js";
import { WcGrille } from "./Grille.js";
import { WcLogo } from "./Logo.js";
import { WcSticky } from "./Sticky.js";
import { WcOverlay } from "./Overlay.js";
import { WcOffcanvas } from "./Offcanvas.js";

// Export all components and types
export { WcCard, WcGrille, WcLogo, WcSticky, WcOverlay, WcOffcanvas };

// Global type declarations
declare global {
  interface HTMLElementTagNameMap {
    "wc-card": WcCard;
    "wc-grille": WcGrille;
    "wc-logo": WcLogo;
    "wc-sticky": WcSticky;
    "wc-overlay": WcOverlay;
    "wc-offcanvas": WcOffcanvas;
  }
}
