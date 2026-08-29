import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";
import { emitValueEvent } from "../../events.js";

@customElement("strata-slider")
export class StrataSlider extends StrataElement {
  @property({type:Number}) value=0;
  @property({type:Number}) min=0;
  @property({type:Number}) max=100;
  @property({type:Number}) step=1;
  @property({type:Boolean, reflect:true}) disabled=false;

  private handleInput(event: Event) {
    if (this.disabled) return;
    this.value=Number((event.target as HTMLInputElement).value);
    emitValueEvent(this,"strata-input",this.value);
  }
  private handleChange() { if (!this.disabled) emitValueEvent(this,"strata-change",this.value); }

  render(){return html`<input aria-label="Slider" type="range" .value=${String(this.value)} min=${this.min} max=${this.max} step=${this.step} ?disabled=${this.disabled} @input=${this.handleInput} @change=${this.handleChange}/>`;}
}
