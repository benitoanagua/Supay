// Import all components to register them
import { WcCard } from "./Card/Card.js";
import { WcGrille } from "./Grille/Grille.js";
import { WcLogo } from "./Logo/Logo.js";
import { WcNavbar } from "./Navbar/Navbar.js";
import { WcOverlay } from "./Overlay/Overlay.js";
import { WcOffcanvas } from "./Offcanvas/Offcanvas.js";

// Export all components and types
export { WcCard, WcGrille, WcLogo, WcNavbar, WcOverlay, WcOffcanvas };

// Global type declarations
declare global {
  interface HTMLElementTagNameMap {
    "wc-card": WcCard;
    "wc-grille": WcGrille;
    "wc-logo": WcLogo;
    "wc-sticky": WcNavbar;
    "wc-overlay": WcOverlay;
    "wc-offcanvas": WcOffcanvas;
  }
}
