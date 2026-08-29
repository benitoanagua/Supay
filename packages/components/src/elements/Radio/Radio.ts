import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-radio")
export class StrataRadio extends StrataElement {
  @property({type:String}) label=""; @property({type:Boolean,reflect:true}) checked=false; @property({type:Boolean}) disabled=false; @property({type:String}) name=""; @property({type:String}) value="";
  render(){return html`<label><input type="radio" .checked=${this.checked} ?disabled=${this.disabled} name=${this.name} value=${this.value} @change=${()=>this.checked=true}/><span>${this.label}<slot></slot></span></label>`;}
}
