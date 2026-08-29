import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-file-upload")
export class StrataFileUpload extends StrataElement {
  @property({type:String}) accept=""; @property({type:Boolean}) multiple=false;
  render(){return html`<label class="upload"><iconify-icon icon="carbon:upload" aria-hidden="true"></iconify-icon><span><slot>Choose file</slot></span><input type="file" accept=${this.accept} ?multiple=${this.multiple}/></label>`;}
}
