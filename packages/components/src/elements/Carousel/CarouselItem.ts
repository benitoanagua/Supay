import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import baseCSS from "../../component-base.css?inline";
import componentCSS from "./Carousel.css?inline";
import type { CarouselItemProps } from "../../types/carousel.js";

@customElement("strata-carousel-item")
export class StrataCarouselItem extends LitElement implements CarouselItemProps {
  static styles = [unsafeCSS(baseCSS), unsafeCSS(componentCSS)];

  @property({ type: Number }) order = 0;
  @property({ type: Boolean }) active = false;

  protected createRenderRoot() {
    return this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.shadowRoot) {
      const contentDiv = this.shadowRoot.querySelector(
        ".strata-carousel-item__content"
      );
      if (contentDiv) {
        contentDiv.classList.add("strata-carousel-item__content");
      }
    }

    // Atributos ARIA
    this.setAttribute("role", "group");
    this.setAttribute("aria-roledescription", "slide");
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("active")) {
      this.updateAriaAttributes();
    }
  }

  private updateAriaAttributes() {
    if (this.active) {
      this.removeAttribute("aria-hidden");
      this.setAttribute("tabindex", "0");
    } else {
      this.setAttribute("aria-hidden", "true");
      this.removeAttribute("tabindex");
    }
  }

  private handleFocus() {
    if (this.active) {
      this.focus();
    }
  }

  render() {
    return html`
      <div
        class="strata-carousel-item__content"
        @focus="${this.handleFocus}"
        tabindex="${this.active ? "0" : "-1"}"
        aria-label="${`Slide ${this.order + 1}`}"
      >
        <slot></slot>
      </div>
    `;
  }
}
