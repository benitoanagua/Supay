import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { emitValueEvent } from "../../events.js";

@customElement("strata-checkbox")
export class StrataCheckbox extends LitElement {
  static styles = css`:host{display:inline-block}label{display:inline-flex;align-items:center;gap:8px;font:400 14px var(--strata-font-sans);cursor:pointer}input{accent-color:var(--strata-color-action-primary);width:16px;height:16px}`;
  @property({type:Boolean, reflect:true}) checked=false;
  @property({type:Boolean, reflect:true}) disabled=false;
  @property() label="";

  private handleChange(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    emitValueEvent(this, "strata-input", this.checked);
    emitValueEvent(this, "strata-change", this.checked);
  }

  render(){return html`<label><input type="checkbox" .checked=${this.checked} ?disabled=${this.disabled} @change=${this.handleChange}><slot>${this.label}</slot></label>`;}
}
