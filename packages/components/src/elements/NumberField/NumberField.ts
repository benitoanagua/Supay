import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";
import { emitValueEvent } from "../../events.js";

@customElement("strata-number-field")
export class StrataNumberField extends StrataElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = -Infinity;
  @property({ type: Number }) max = Infinity;
  @property({ type: Number }) step = 1;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) label = "Number";
  private handleInput(e: Event) { if (this.disabled) return; this.value = Number((e.target as HTMLInputElement).value); emitValueEvent(this, "strata-input", this.value); }
  private handleChange() { if (!this.disabled) emitValueEvent(this, "strata-change", this.value); }
  render() { return html`<label class="strata-field strata-number-field"><span>${this.label}</span><input class="strata-number-field__input" type="number" .value=${String(this.value)} min=${this.min} max=${this.max} step=${this.step} ?disabled=${this.disabled} @input=${this.handleInput} @change=${this.handleChange} /></label>`; }
}
