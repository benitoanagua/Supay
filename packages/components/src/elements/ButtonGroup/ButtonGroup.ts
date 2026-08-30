import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StrataElement } from "../StrataBase.js";

@customElement("strata-button-group")
export class StrataButtonGroup extends StrataElement {
  @property({ type: String }) orientation: "horizontal" | "vertical" =
    "horizontal";
  render() {
    return html`<div class="strata-control-group" role="group">
      <slot></slot>
    </div>`;
  }
}
