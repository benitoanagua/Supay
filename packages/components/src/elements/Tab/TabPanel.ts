import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import baseCSS from "../../component-base.css?inline";
import componentCSS from "./Tab.css?inline";
import type { TabPanelProps } from "../../types/tabs.js";

@customElement("strata-tab-panel")
export class StrataTabPanel extends LitElement implements TabPanelProps {
  static styles = [unsafeCSS(baseCSS), unsafeCSS(componentCSS)];

  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: String, attribute: "panel-id" }) panelId = "";

  protected willUpdate(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("active")) {
      this.style.display = this.active ? "block" : "none";
    }
  }

  render() {
    return html`
      <div
        class="strata-tab-panel__content"
        id=${this.panelId || undefined}
        role="tabpanel"
        aria-hidden="${!this.active}"
      >
        <slot></slot>
      </div>
    `;
  }
}
