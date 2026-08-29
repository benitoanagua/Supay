import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-stepper")
export class StrataStepper extends StrataElement {
  @property({type:Number}) value=0; @property({type:Number}) min=0; @property({type:Number}) max=10;
  render(){return html`<div class="stepper"><button aria-label="Decrease" @click=${()=>this.value=Math.max(this.min,this.value-1)}><iconify-icon icon="carbon:subtract"></iconify-icon></button><output class="mono">${this.value}</output><button aria-label="Increase" @click=${()=>this.value=Math.min(this.max,this.value+1)}><iconify-icon icon="carbon:add"></iconify-icon></button></div>`;}
}
