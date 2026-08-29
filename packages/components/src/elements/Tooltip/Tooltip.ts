import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-tooltip")
export class StrataTooltip extends StrataElement {
  @property({type:String}) text="";
  render(){return html`<span class="tooltip"><slot></slot><span role="tooltip">${this.text}</span></span>`;}
}
