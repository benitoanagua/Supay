import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import baseCSS from "../../component-base.css?inline";
import componentCSS from "./Accordion.css?inline";
import type { AccordionItemProps } from "../../types/accordion.js";

@customElement("strata-accordion-item")
export class StrataAccordionItem
  extends LitElement
  implements AccordionItemProps
{
  static styles = [unsafeCSS(baseCSS), unsafeCSS(componentCSS)];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean, reflect: true }) disabled = false;


  private toggle() {
    if (this.disabled) return;

    const index = Array.from(this.parentElement?.children || []).indexOf(this);

    this.dispatchEvent(
      new CustomEvent("accordion-toggle", {
        bubbles: true,
        composed: true,
        detail: { index },
      })
    );
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.toggle();
    }
  }

  private updateClasses() {
    // Reset classes
    this.className = this.className
      .split(" ")
      .filter((cls) => !cls.startsWith("strata-accordion-item--"))
      .join(" ");

    // Add current state classes
    this.classList.add("strata-accordion-item");
    this.classList.add("strata-accordion-item--flat");

    if (this.open) {
      this.classList.add("strata-accordion-item--open");
    }

    if (this.disabled) {
      this.classList.add("strata-accordion-item--disabled");
    }
  }

  protected willUpdate() {
    this.updateClasses();
  }

  render() {
    return html`
      <div class="strata-accordion-item">
        <button
          class="strata-accordion-item__header"
          @click="${this.toggle}"
          @keydown="${this.handleKeyDown}"
          ?disabled="${this.disabled}"
          aria-expanded="${this.open}"
          aria-disabled="${this.disabled}"
        >
          <span class="strata-accordion-item__label">
            <slot name="header"></slot>
          </span>
          <span class="strata-accordion-item__icon">
            <iconify-icon
              class="strata-accordion-item__chevron ${this.open ? "is-open" : ""}"
              icon="carbon:chevron-down"
              aria-hidden="true"
            ></iconify-icon>
          </span>
        </button>
        <div class="strata-accordion-item__panel" ?hidden="${!this.open}">
          <div class="strata-accordion-item__content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
