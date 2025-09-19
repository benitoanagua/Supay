import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-sticky")
export class WcSticky extends LitElement {
  static styles = unsafeCSS(mainCSS);

  @state() private isVisible = false;
  @state() private isMobile = false;

  @query(".wc-sticky") private stickyElement?: HTMLElement;

  private intersectionObserver?: IntersectionObserver;
  private mediaQuery?: MediaQueryList;
  private scrollY = 0;
  private elementTop = 0;

  // Usar Shadow DOM pero con estilos globales
  protected createRenderRoot() {
    const shadowRoot = super.createRenderRoot();

    // Aplicar estilos globales manualmente
    const style = document.createElement("style");
    style.textContent = (mainCSS as any).toString();
    shadowRoot.appendChild(style);

    return shadowRoot;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupMediaQuery();
    this.setupScrollListener();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupObservers();
    this.cleanupScrollListener();
  }

  protected firstUpdated() {
    this.setupIntersectionObserver();
    this.updateElementPosition();
  }

  private setupMediaQuery() {
    if (typeof window === "undefined") return;

    this.mediaQuery = window.matchMedia("(max-width: 768px)");
    this.isMobile = this.mediaQuery.matches;

    this.mediaQuery.addEventListener("change", this.updateMediaQuery);
  }

  private updateMediaQuery = (e: MediaQueryListEvent) => {
    this.isMobile = e.matches;
  };

  private setupScrollListener() {
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  private cleanupScrollListener() {
    if (typeof window === "undefined") return;
    window.removeEventListener("scroll", this.handleScroll);
  }

  private handleScroll = () => {
    this.scrollY = window.scrollY;
    this.updateVisibility();
  };

  private updateElementPosition() {
    if (this.stickyElement) {
      this.elementTop =
        this.stickyElement.getBoundingClientRect().top + this.scrollY;
    }
  }

  private updateVisibility() {
    this.isVisible = this.scrollY > this.elementTop;
  }

  private setupIntersectionObserver() {
    if (typeof window === "undefined" || !this.stickyElement) return;

    this.cleanupObservers();

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isVisible =
            !entry.isIntersecting && this.scrollY > this.elementTop;
        });
      },
      {
        threshold: 0,
        rootMargin: "0px",
      }
    );

    this.intersectionObserver.observe(this.stickyElement);
  }

  private cleanupObservers() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = undefined;
    }
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener("change", this.updateMediaQuery);
    }
  }

  render() {
    return html`
      <nav class="wc-sticky">
        <div class="wc-sticky__container">
          <!-- Slot 1: Logo - Izquierda en desktop, centro en mobile -->
          <div
            class="${this.isMobile
              ? "wc-sticky__logo wc-sticky__logo--mobile"
              : "wc-sticky__logo wc-sticky__logo--desktop"}"
          >
            <slot name="logo"></slot>
          </div>

          <!-- Slot 2: Navigation - Centro en desktop, offcanvas en mobile -->
          <div
            class="${this.isMobile
              ? "wc-sticky__navigation wc-sticky__navigation--mobile"
              : "wc-sticky__navigation wc-sticky__navigation--desktop"}"
          >
            ${this.isMobile
              ? html`
                  <wc-offcanvas>
                    <slot name="navigation"></slot>
                  </wc-offcanvas>
                `
              : html`<slot name="navigation"></slot>`}
          </div>

          <!-- Slot 3: Actions - Derecha en desktop, izquierda en mobile -->
          <div
            class="${this.isMobile
              ? "wc-sticky__actions wc-sticky__actions--mobile"
              : "wc-sticky__actions wc-sticky__actions--desktop"}"
          >
            <slot name="actions"></slot>
          </div>
        </div>
      </nav>

      <!-- Sticky navigation (solo visible al hacer scroll) -->
      ${this.isVisible
        ? html`
            <nav class="wc-sticky--sticky wc-sticky--visible">
              <div class="wc-sticky__container">
                <!-- Logo -->
                <div
                  class="${this.isMobile
                    ? "wc-sticky__logo wc-sticky__logo--mobile"
                    : "wc-sticky__logo wc-sticky__logo--desktop"}"
                >
                  <slot name="logo"></slot>
                </div>

                <!-- Navigation -->
                <div
                  class="${this.isMobile
                    ? "wc-sticky__navigation wc-sticky__navigation--mobile"
                    : "wc-sticky__navigation wc-sticky__navigation--desktop"}"
                >
                  ${this.isMobile
                    ? html`
                        <wc-offcanvas>
                          <slot name="navigation"></slot>
                        </wc-offcanvas>
                      `
                    : html`<slot name="navigation"></slot>`}
                </div>

                <!-- Actions -->
                <div
                  class="${this.isMobile
                    ? "wc-sticky__actions wc-sticky__actions--mobile"
                    : "wc-sticky__actions wc-sticky__actions--desktop"}"
                >
                  <slot name="actions"></slot>
                </div>
              </div>
            </nav>
          `
        : ""}
    `;
  }
}
