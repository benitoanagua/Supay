import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-spinner")
export class StrataSpinner extends StrataElement {
  @property({ type: String }) label = "Loading";
  render() {
    return html`<span
      class="strata-spinner"
      role="status"
      aria-label=${this.label}
    ></span>`;
  }
}
