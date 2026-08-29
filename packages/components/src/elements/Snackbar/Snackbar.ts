import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-snackbar")
export class StrataSnackbar extends StrataElement {
  @property({type:Boolean,reflect:true}) open=false; @property({type:String}) message="";
  render(){return html`<div class="snackbar" ?hidden=${!this.open} role="status"><span>${this.message}</span><slot></slot></div>`;}
}
