import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-menu")
export class StrataMenu extends StrataElement {
  @property({type:Boolean}) open=true;
  render(){return html`<div class="strata-menu" role="menu" ?hidden=${!this.open}><slot></slot></div>`;}
}
