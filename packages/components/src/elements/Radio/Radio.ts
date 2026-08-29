import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";
import { emitValueEvent } from "../../events.js";

@customElement("strata-radio")
export class StrataRadio extends StrataElement {
  @property({type:String}) label="";
  @property({type:Boolean,reflect:true}) checked=false;
  @property({type:Boolean,reflect:true}) disabled=false;
  @property({type:String}) name="";
  @property({type:String}) value="";

  private handleChange(){
    if(this.disabled)return;
    this.checked=true;
    emitValueEvent(this,"strata-input",this.value);
    emitValueEvent(this,"strata-change",this.value);
  }

  render(){return html`<label><input type="radio" .checked=${this.checked} ?disabled=${this.disabled} name=${this.name} value=${this.value} @change=${this.handleChange}/><span>${this.label}<slot></slot></span></label>`;}
}
