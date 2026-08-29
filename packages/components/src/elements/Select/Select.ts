import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { emitValueEvent } from "../../events.js";

@customElement("strata-select")
export class StrataSelect extends LitElement {
  static styles = css`
    :host { display: block; }
    label { display: grid; gap: 6px; font: 500 12px/1.2 var(--strata-font-sans); }
    select { min-height: 40px; padding: 9px 12px; border: var(--strata-border-small) solid var(--strata-color-border-subtle); border-radius: var(--strata-radius-small); background: var(--strata-color-surface-page); color: var(--strata-color-text-primary); font: 400 14px var(--strata-font-sans); }
  `;
  @property() label = "";
  @property() value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;

  private handleInput(event: Event) {
    if (this.disabled) return;
    this.value = (event.target as HTMLSelectElement).value;
    emitValueEvent(this, "strata-input", this.value);
  }
  private handleChange() { if (!this.disabled) emitValueEvent(this, "strata-change", this.value); }

  render() {
    return html`<label>${this.label}<select .value=${this.value} ?disabled=${this.disabled} @input=${this.handleInput} @change=${this.handleChange}><slot></slot></select></label>`;
  }
}
