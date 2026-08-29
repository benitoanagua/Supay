import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";
import { emitValueEvent } from "../../events.js";

@customElement("strata-search-field")
export class StrataSearchField extends StrataElement {
  @property({type:String}) value=""; @property({type:String}) label="Search"; @property({type:String}) placeholder="Search"; @property({type:Boolean,reflect:true}) disabled=false;
  private handleInput(e:Event){if(this.disabled)return;this.value=(e.target as HTMLInputElement).value;emitValueEvent(this,"strata-input",this.value);}
  private handleChange(){if(!this.disabled)emitValueEvent(this,"strata-change",this.value);}
  render(){return html`<label class="strata-field strata-search-field"><iconify-icon icon="carbon:search" aria-hidden="true"></iconify-icon><input type="search" .value=${this.value} placeholder=${this.placeholder} aria-label=${this.label || this.placeholder} ?disabled=${this.disabled} @input=${this.handleInput} @change=${this.handleChange}/></label>`;}
}
