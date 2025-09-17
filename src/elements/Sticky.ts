import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-sticky")
export class WcSticky extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @state() private isVisible = false;

  @query(".container") private containerElement?: HTMLElement;

  private intersectionObserver?: IntersectionObserver;

  // Deshabilitar Shadow DOM para usar estilos globales de Tailwind
  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupIntersectionObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupObserver();
  }

  protected firstUpdated() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    if (typeof window === "undefined" || !this.containerElement) return;

    this.cleanupObserver();

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isVisible = entry.isIntersecting;
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      },
    );

    this.intersectionObserver.observe(this.containerElement);
  }

  private cleanupObserver() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = undefined;
    }
  }

  render() {
    return html`
      <div class="container">
        <div
          class="transition-opacity duration-300 ${this.isVisible
            ? "opacity-100"
            : "opacity-0"}"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
