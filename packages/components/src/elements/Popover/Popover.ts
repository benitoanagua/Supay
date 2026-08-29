import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-popover")
export class StrataPopover extends StrataElement {
  @property({type:Boolean,reflect:true}) open=false;
  render(){return html`<div class="popover" ?hidden=${!this.open}><slot></slot></div>`;}
}
