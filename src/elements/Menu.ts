import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-menu")
export class WcMenu extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Boolean }) dark = false;
  @property({ type: String, reflect: true }) home = "#";

  @state() private isOpen = false;
  @state() private isMobile = false;

  private mediaQuery?: MediaQueryList;

  // Deshabilitar Shadow DOM para usar estilos globales de Tailwind
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

    this.mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateIsMobile = () => {
      this.isMobile = this.mediaQuery!.matches;
    };

    updateIsMobile();
    this.mediaQuery.addEventListener("change", updateIsMobile);
  }

  private cleanupMediaQuery() {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener("change", this.updateMediaQuery);
    }
  }

  private updateMediaQuery = () => {
    this.isMobile = this.mediaQuery!.matches;
  };

  private toggleMobileMenu() {
    this.isOpen = !this.isOpen;
  }

  private getButtonClasses() {
    const baseClasses = "border-0 p-1";
    const colorClasses = this.dark
      ? "bg-neutral-900 text-white"
      : "bg-white text-neutral-900";
    return `${baseClasses} ${colorClasses}`;
  }

  private getMenuClasses() {
    const baseClasses = "list-none pl-0";
    const visibilityClasses = !this.isOpen
      ? "hidden md:inline-flex"
      : "inline-flex";
    const directionClasses = this.isMobile
      ? "flex-col w-full pt-8 pb-4 gap-y-4"
      : "flex-row gap-x-4";

    return `${baseClasses} ${visibilityClasses} ${directionClasses}`;
  }

  render() {
    return html`
      <div class="md:hidden flex justify-between">
        <button
          class="${this.getButtonClasses()}"
          @click="${this.toggleMobileMenu}"
          aria-label="Toggle menu"
        >
          <span
            class="block h-6 w-6 ${!this.isOpen
              ? "i-ri-menu-line"
              : "i-ri-close-line"}"
          ></span>
        </button>
        <a href="${this.home}">
          <slot name="logo"></slot>
        </a>
        <slot name="search"></slot>
      </div>

      <div class="${this.getMenuClasses()}">
        <slot></slot>
      </div>
    `;
  }
}
