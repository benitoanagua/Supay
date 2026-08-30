import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-bottom-sheet")
export class StrataBottomSheet extends StrataElement {
  @property({ type: Boolean, reflect: true }) open = false;
  private handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && this.open) this.open = false;
  };
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("keydown", this.handleEscape);
  }
  disconnectedCallback() {
    window.removeEventListener("keydown", this.handleEscape);
    super.disconnectedCallback();
  }
  @property({ type: String }) title = "";
  render() {
    return html`<section
      class="strata-bottom-sheet"
      ?hidden=${!this.open}
      role="dialog"
      role="dialog"
      aria-modal="true"
      aria-label=${this.title}
    >
      <header>
        <strong>${this.title}</strong
        ><button
          type="button"
          aria-label="Close"
          @click=${() => (this.open = false)}
        >
          <iconify-icon icon="carbon:close"></iconify-icon>
        </button>
      </header>
      <slot></slot>
    </section>`;
  }
}
