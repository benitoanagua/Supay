import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-date-field")
export class StrataDateField extends StrataElement {
  @property({type:String}) value=""; @property({type:String}) label="Date";
  render(){return html`<label class="field"><span>${this.label}</span><input type="date" .value=${this.value} @input=${(e:Event)=>this.value=(e.target as HTMLInputElement).value}/></label>`;}
}
