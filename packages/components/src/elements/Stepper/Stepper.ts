import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-stepper")
export class StrataStepper extends StrataElement {
  @property({type:Number}) value=0; @property({type:Boolean,reflect:true}) disabled=false; @property({type:Number}) min=0; @property({type:Number}) max=10;
  render(){return html`<div class="strata-stepper"><button aria-label="Decrease" @click=${()=>{if(!this.disabled)this.value=Math.max(this.min,this.value-1)}} ?disabled=${this.disabled}><iconify-icon icon="carbon:subtract"></iconify-icon></button><output class="strata-stepper__value">${this.value}</output><button aria-label="Increase" @click=${()=>{if(!this.disabled)this.value=Math.min(this.max,this.value+1)}} ?disabled=${this.disabled}><iconify-icon icon="carbon:add"></iconify-icon></button></div>`;}
}
