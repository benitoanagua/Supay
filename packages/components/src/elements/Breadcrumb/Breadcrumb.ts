import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-breadcrumb")
export class StrataBreadcrumb extends StrataElement {
  @property({type:String}) items="";
  render(){const items=this.items.split("|").filter(Boolean);return html`<nav aria-label="Breadcrumb"><ol>${items.map((x,i)=>html`<li><span>${x}</span>${i<items.length-1?html`<span aria-hidden="true">/</span>`:""}</li>`)}</ol></nav>`;}
}
