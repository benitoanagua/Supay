import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-tag")
export class StrataTag extends StrataElement {
  @property({type:String}) label=""; @property({type:Boolean}) removable=false;
  render(){return html`<span class="tag">${this.label||html`<slot></slot>`}${this.removable?html`<button aria-label="Remove" @click=${()=>this.dispatchEvent(new CustomEvent("remove"))}><iconify-icon icon="carbon:close"></iconify-icon></button>`:""}</span>`;}
}
