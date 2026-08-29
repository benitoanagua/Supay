import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-radio-group")
export class RadioGroup extends StrataElement {
  @property({type:String}) label="";
  render(){return html`<fieldset><legend>${this.label}</legend><slot></slot></fieldset>`;}
}
