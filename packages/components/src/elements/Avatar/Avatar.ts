import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-avatar")
export class StrataAvatar extends StrataElement {
  @property({type:String}) label=""; @property({type:String}) src=""; @property({type:String}) alt="";
  render(){return html`<div class="strata-avatar" role=${this.alt || this.label ? "img" : "presentation"} aria-label=${this.alt || this.label || undefined}>${this.src?html`<img src=${this.src} alt=""/>`:html`<span>${this.label.slice(0,2).toUpperCase()}</span>`}</div>`;}
}
