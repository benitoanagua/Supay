import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-list")
export class StrataList extends StrataElement {
  @property({ type: Boolean }) divided = false;
  render() {
    return html`<div class="strata-list" role="list"><slot></slot></div>`;
  }
}
