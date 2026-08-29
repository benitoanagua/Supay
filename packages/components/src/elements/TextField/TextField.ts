import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { emitValueEvent } from "../../events.js";

@customElement("strata-text-field")
export class StrataTextField extends LitElement {
  static styles = css`
    :host { display: block; }
    .strata-text-field { display: grid; gap: 6px; }
    label { font: 500 12px/1.2 var(--strata-font-sans); }
    input { width: 100%; min-height: 40px; padding: 9px 12px; border: var(--strata-border-small) solid var(--strata-color-border-subtle); border-radius: var(--strata-radius-small); background: var(--strata-color-surface-page); color: var(--strata-color-text-primary); font: 400 14px/1.4 var(--strata-font-sans); }
    input:focus { border-color: var(--strata-color-focus-ring); outline: 2px solid color-mix(in srgb, var(--strata-color-focus-ring) 25%, transparent); outline-offset: 1px; }
  `;

  @property() label = "";
  @property() placeholder = "";
  @property() value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;

  private handleInput(event: Event) {
    if (this.disabled) return;
    this.value = (event.target as HTMLInputElement).value;
    emitValueEvent(this, "strata-input", this.value);
  }

  private handleChange() {
    if (!this.disabled) emitValueEvent(this, "strata-change", this.value);
  }

  render() {
    return html`<div class="strata-text-field">
      <label>${this.label}</label>
      <input .value=${this.value} .placeholder=${this.placeholder} ?disabled=${this.disabled}
        @input=${this.handleInput} @change=${this.handleChange} />
    </div>`;
  }
}
