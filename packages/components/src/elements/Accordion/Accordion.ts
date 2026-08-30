import { LitElement, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import baseCSS from "../../component-base.css?inline";
import componentCSS from "./Accordion.css?inline";
import type { AccordionProps } from "../../types/accordion.js";
import type { StrataAccordionItem } from "./AccordionItem.js";

@customElement("strata-accordion")
export class StrataAccordion extends LitElement implements AccordionProps {
  static styles = [unsafeCSS(baseCSS), unsafeCSS(componentCSS)];

  @property({ type: Boolean, reflect: true }) multiple = false;
  @property({ type: String }) variant: "default" | "bordered" | "separated" =
    "default";

  @queryAssignedElements({ selector: "strata-accordion-item" })
  private items!: StrataAccordionItem[];

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("accordion-toggle", this.onToggle as EventListener);
  }

  disconnectedCallback() {
    this.removeEventListener(
      "accordion-toggle",
      this.onToggle as EventListener,
    );
    super.disconnectedCallback();
  }

  private onToggle(e: CustomEvent<{ index: number }>) {
    const { index } = e.detail;

    this.items.forEach((item, i) => {
      if (i === index) {
        item.open = !item.open;
      } else if (!this.multiple) {
        item.open = false;
      }
    });
  }

  private getAccordionClasses() {
    return [
      "strata-accordion",
      "strata-accordion--flat",
      `strata-accordion--${this.variant}`,
    ].join(" ");
  }

  render() {
    return html`<div class="${this.getAccordionClasses()}"><slot></slot></div>`;
  }
}
