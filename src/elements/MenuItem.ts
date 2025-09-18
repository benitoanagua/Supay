import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-menu-item")
export class WcMenuItem extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: String, reflect: true }) url = "#";
  @property({ type: Boolean }) current = false;
  @property({ type: Boolean }) dark = false;

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

  private getLinkClasses() {
    const baseClasses = "no-underline font-sans";

    let colorClasses;
    if (this.current) {
      colorClasses = "text-red-500";
    } else if (this.dark) {
      colorClasses = "text-white";
    } else {
      colorClasses = "text-neutral-900";
    }

    const sizeClasses = this.isMobile
      ? "text-lg font-medium"
      : "text-xs font-700 tracking-wide";

    return `${baseClasses} ${colorClasses} ${sizeClasses}`;
  }

  render() {
    return html`
      <div class="uppercase">
        <a class="${this.getLinkClasses()}" href="${this.url}">
          <slot></slot>
        </a>
      </div>
    `;
  }
}
