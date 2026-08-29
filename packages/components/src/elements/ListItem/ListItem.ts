import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-list-item")
export class StrataListItem extends StrataElement {
  @property({type:String}) title=""; @property({type:String}) description=""; @property({type:String}) href="";
  render(){return html`<article class="strata-list-item" role="listitem">${this.href?html`<a href=${this.href}><strong>${this.title}</strong><span>${this.description}</span></a>`:html`<strong>${this.title}</strong><span>${this.description}</span>`}<slot></slot></article>`;}
}
