import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { emitValueEvent } from "../../events.js";

@customElement("strata-switch")
export class StrataSwitch extends LitElement {
  static styles = css`:host{display:inline-block}button{width:40px;height:24px;padding:2px;border:0;border-radius:999px;background:var(--strata-color-gray-300);cursor:pointer}button:disabled{cursor:not-allowed;opacity:.6}span{display:block;width:20px;height:20px;border-radius:50%;background:var(--strata-color-white);transition:transform .18s ease}button[aria-checked=true]{background:var(--strata-color-green)}button[aria-checked=true] span{transform:translateX(16px)}@media(prefers-reduced-motion:reduce){span{transition:none}}`;
  @property({type:Boolean,reflect:true}) checked=false;
  @property({type:Boolean,reflect:true}) disabled=false;
  @property({type:String}) label="";

  private toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    emitValueEvent(this, "strata-input", this.checked);
    emitValueEvent(this, "strata-change", this.checked);
  }

  render(){return html`<button type="button" role="switch" aria-checked=${this.checked} aria-label=${this.label || "Toggle"} ?disabled=${this.disabled} @click=${this.toggle}><span></span></button>`;}
}
