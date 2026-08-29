import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-avatar")
export class StrataAvatar extends StrataElement {
  @property({type:String}) label=""; @property({type:String}) src=""; @property({type:String}) alt="";
  render(){return html`<div class="avatar" role="img" aria-label=${this.alt||this.label}>${this.src?html`<img src=${this.src} alt=""/>`:html`<span>${this.label.slice(0,2).toUpperCase()}</span>`}</div>`;}
}
