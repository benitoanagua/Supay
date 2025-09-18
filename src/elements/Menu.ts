import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type {
  MenuItem,
  MenuToggleEvent,
  MenuItemSelectEvent,
} from "../types/menu";

@customElement("wc-menu")
export class WcMenu extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Object }) menu: Record<string, MenuItem> = {};

  @state() private isOpen = false;
  @state() private isMobile = false;
  @state() private showMobileMenu = true;

  private mediaQuery?: MediaQueryList;

  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupMediaQuery();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupMediaQuery();
    document.body.style.overflow = "auto";
  }

  private setupMediaQuery() {
    if (typeof window === "undefined") return;

    this.mediaQuery = window.matchMedia("(max-width: 768px)");
    this.isMobile = this.mediaQuery.matches;
    this.showMobileMenu = !this.isOpen;

    this.mediaQuery.addEventListener("change", this.updateMediaQuery);
  }

  private cleanupMediaQuery() {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener("change", this.updateMediaQuery);
    }
  }

  private updateMediaQuery = (e: MediaQueryListEvent) => {
    this.isMobile = e.matches;
    if (!this.isMobile && this.isOpen) {
      this.toggleMenu();
    }
  };

  private toggleMenu() {
    this.isOpen = !this.isOpen;
    this.showMobileMenu = !this.isOpen;

    if (this.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const event: MenuToggleEvent = new CustomEvent("menu-toggle", {
      detail: { isOpen: this.isOpen },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private handleItemClick(e: MenuItemSelectEvent) {
    const { url, title } = e.detail;
    this.isOpen = false;
    this.showMobileMenu = true;
    document.body.style.overflow = "auto";

    const event: MenuItemSelectEvent = new CustomEvent("menu-item-selected", {
      detail: { url, title },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private renderMenuItems() {
    // Si hay menu items definidos por propiedad, usarlos
    if (Object.keys(this.menu).length > 0) {
      return Object.entries(this.menu).map(
        ([key, item]) =>
          html`<wc-menu-item
            .url="${item.url}"
            .title="${item.title}"
            .active="${item.active || false}"
            @menu-item-click="${this.handleItemClick}"
          ></wc-menu-item>`
      );
    }

    // Si no hay menu items por propiedad, usar el slot
    return html`<slot></slot>`;
  }

  private renderMobileMenu() {
    if (!this.showMobileMenu) return html``;

    return html`
      <button
        class="wc-menu-toggle p-2 rounded-full bg-surfaceContainerLow text-onSurfaceVariant hover:bg-surfaceContainer transition-colors duration-200"
        @click="${this.toggleMenu}"
        aria-label="Toggle menu"
        aria-expanded="${this.isOpen}"
      >
        <span
          class="block h-6 w-6 ${!this.isOpen
            ? "icon-[garden--menu-stroke-16]"
            : ""}"
        ></span>
      </button>
    `;
  }

  private renderOffcanvas() {
    if (!this.isOpen) return html``;

    return html`
      <div
        class="wc-menu-overlay fixed inset-0 bg-scrim/50 z-40 transition-opacity duration-300 opacity-100"
        @click="${this.toggleMenu}"
        aria-hidden="true"
      ></div>

      <div
        class="wc-menu-offcanvas fixed top-0 h-full bg-surface z-50 transition-transform duration-300 ease-in-out shadow-lg left-0 translate-x-0"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div class="h-full flex flex-col">
          <div
            class="wc-menu-header p-4 border-b border-outlineVariant flex items-center justify-end"
          >
            <button
              class="p-2 rounded-full hover:bg-surfaceContainerLow transition-colors"
              @click="${this.toggleMenu}"
              aria-label="Close menu"
            >
              <span class="block h-6 w-6 icon-[garden--x-stroke-16]"></span>
            </button>
          </div>

          <div class="wc-menu-content flex-1 overflow-y-auto p-4">
            <nav class="flex flex-col gap-2">${this.renderMenuItems()}</nav>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="wc-menu-container">
        ${this.isMobile
          ? html`
              <div class="flex items-center justify-end w-full">
                ${this.renderMobileMenu()} ${this.renderOffcanvas()}
              </div>
            `
          : html`
              <nav
                class="wc-menu-desktop flex items-center gap-1"
                aria-label="Main navigation"
              >
                ${this.renderMenuItems()}
              </nav>
            `}
      </div>
    `;
  }
}
