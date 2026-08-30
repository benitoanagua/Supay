import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";
import { emitValueEvent } from "../../events.js";

@customElement("strata-date-field")
export class StrataDateField extends StrataElement {
  @property({ type: String }) value = "";
  @property({ type: String }) label = "Date";
  @property({ type: Boolean, reflect: true }) disabled = false;
  private handleInput(e: Event) {
    if (this.disabled) return;
    this.value = (e.target as HTMLInputElement).value;
    emitValueEvent(this, "strata-input", this.value);
  }
  private handleChange() {
    if (!this.disabled) emitValueEvent(this, "strata-change", this.value);
  }
  render() {
    return html`<label class="strata-field strata-date-field"
      ><span>${this.label}</span
      ><input
        type="date"
        .value=${this.value}
        ?disabled=${this.disabled}
        @input=${this.handleInput}
        @change=${this.handleChange}
    /></label>`;
  }
}
