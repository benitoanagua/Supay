import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import baseCSS from "../../component-base.css?inline";
import componentCSS from "./Tab.css?inline";
import type { TabProps } from "../../types/tabs.js";

@customElement("strata-tab")
export class StrataTab extends LitElement implements TabProps {
  static styles = [unsafeCSS(baseCSS), unsafeCSS(componentCSS)];

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: String, attribute: "panel-id" }) panelId = "";



  render() {
    return html`
      <button
        class="strata-tab__button"
        role="tab"
        ?disabled="${this.disabled}"
        aria-selected="${this.active}"
        tabindex="${this.active ? 0 : -1}"
        aria-controls=${this.panelId || undefined}
      >
        <slot></slot>
      </button>
    `;
  }
}
