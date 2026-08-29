import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-slider")
export class StrataSlider extends StrataElement {
  @property({type:Number}) value=0; @property({type:Number}) min=0; @property({type:Number}) max=100; @property({type:Number}) step=1;
  render(){return html`<input aria-label="Slider" type="range" .value=${String(this.value)} min=${this.min} max=${this.max} step=${this.step} @input=${(e:Event)=>this.value=Number((e.target as HTMLInputElement).value)}/>`;}
}
