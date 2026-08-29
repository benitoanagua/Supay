import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-search-field")
export class StrataSearchField extends StrataElement {
  @property({type:String}) value=""; @property({type:String}) placeholder="Search";
  render(){return html`<label class="field"><iconify-icon icon="carbon:search" aria-hidden="true"></iconify-icon><input type="search" .value=${this.value} placeholder=${this.placeholder} aria-label=${this.placeholder} @input=${(e:Event)=>this.value=(e.target as HTMLInputElement).value}/></label>`;}
}
