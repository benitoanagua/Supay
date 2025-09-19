// src/elements/Sticky.ts
import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-sticky")
export class WcSticky extends LitElement {
  static styles = unsafeCSS(mainCSS);

  @state() private isVisible = false;
  @query(".wc-sticky") private stickyElement?: HTMLElement;

  private intersectionObserver?: IntersectionObserver;
  private scrollY = 0;
  private elementTop = 0;

  // Deshabilitar Shadow DOM para usar estilos globales de Tailwind
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
  }

  private renderContent() {
    return html`
      <div
        class="flex items-center justify-between w-full px-4 py-3 mx-auto md:px-6 lg:px-8"
      >
        <!-- Logo: Izquierda en desktop, centro en mobile -->
        <div class="flex items-center order-2 md:order-1">
          <slot name="logo"></slot>
        </div>

        <!-- Navigation: Centro en desktop, offcanvas en mobile -->
        <div class="flex items-center order-1 md:order-2">
          <slot name="navigation"></slot>
        </div>

        <!-- Actions: Derecha en desktop, izquierda en mobile -->
        <div class="flex items-center order-3 md:order-3">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <!-- Main navigation -->
      <nav class="wc-sticky w-full transition-all duration-300 ease-in-out">
        ${this.renderContent()}
      </nav>

      <!-- Sticky navigation (visible on scroll) -->
      ${this.isVisible
        ? html`
            <nav
              class="fixed top-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-outline/20 transition-all duration-300 ease-in-out opacity-100 translate-y-0"
            >
              ${this.renderContent()}
            </nav>
          `
        : ""}
    `;
  }
}
