import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-drawer")
export class StrataDrawer extends StrataElement {
  @property({type:Boolean,reflect:true}) open=false; @property({type:String}) title="";
  render(){return html`<aside class="drawer" ?hidden=${!this.open} aria-label=${this.title}><header><strong>${this.title}</strong><button aria-label="Close" @click=${()=>this.open=false}><iconify-icon icon="carbon:close"></iconify-icon></button></header><slot></slot></aside>`;}
}
