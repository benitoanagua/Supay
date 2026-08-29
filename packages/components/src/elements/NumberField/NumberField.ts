import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-number-field")
export class StrataNumberField extends StrataElement {
  @property({type:Number}) value=0; @property({type:Number}) min=-Infinity; @property({type:Number}) max=Infinity; @property({type:Number}) step=1;
  render(){return html`<input class="field mono" type="number" .value=${String(this.value)} min=${this.min} max=${this.max} step=${this.step} @input=${(e:Event)=>this.value=Number((e.target as HTMLInputElement).value)}/>`;}
}
