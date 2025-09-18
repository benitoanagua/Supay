import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type { MenuItemSelectEvent } from "../types/menu";

@customElement("wc-menu-item")
export class WcMenuItem extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: String }) url = "#";
  @property({ type: String }) title = "";
  @property({ type: Boolean }) active = false;

  @state() private isMobile = false;

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
  }

  private setupMediaQuery() {
    if (typeof window === "undefined") return;

    this.mediaQuery = window.matchMedia("(max-width: 768px)");
    this.isMobile = this.mediaQuery.matches;

    this.mediaQuery.addEventListener("change", this.updateMediaQuery);
  }

  private cleanupMediaQuery() {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener("change", this.updateMediaQuery);
    }
  }

  private updateMediaQuery = (e: MediaQueryListEvent) => {
    this.isMobile = e.matches;
  };

  private getMenuItemClasses() {
    const classes = [
      "wc-menu-item",
      "no-underline",
      "transition-all",
      "duration-200",
      "rounded-full",
      "flex",
      "items-center",
      "px-4",
      "py-3",
    ];

    if (this.isMobile) {
      classes.push("text-base", "font-medium");
    } else {
      classes.push("text-sm", "font-medium", "tracking-wide");
    }

    if (this.active) {
      classes.push("bg-primaryContainer", "text-onPrimaryContainer");
    } else {
      classes.push("text-onSurfaceVariant", "hover:bg-surfaceContainerLow");
    }

    return classes.join(" ");
  }

  private handleClick(e: Event) {
    e.preventDefault();
    const event: MenuItemSelectEvent = new CustomEvent("menu-item-click", {
      detail: { url: this.url, title: this.title },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <a
        class="${this.getMenuItemClasses()}"
        href="${this.url}"
        @click="${this.handleClick}"
        aria-current="${this.active ? "page" : "false"}"
      >
        <span class="wc-menu-item-label">${this.title}</span>
      </a>
    `;
  }
}
