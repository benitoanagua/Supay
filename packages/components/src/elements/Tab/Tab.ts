import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import mainCSS from "../../main.css?inline";
import type { TabProps } from "../../types/tabs.js";

@customElement("strata-tab")
export class StrataTab extends LitElement implements TabProps {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) active = false;

  protected createRenderRoot() {
    const shadowRoot = super.createRenderRoot();

    // Ensure theme style element is created
    const themeStyle = document.createElement("style");
    themeStyle.id = "theme-vars";
    shadowRoot.appendChild(themeStyle);

    return shadowRoot;
  }

  render() {
    return html`
      <button
        class="strata-tab__button"
        role="tab"
        ?disabled="${this.disabled}"
        aria-selected="${this.active}"
      >
        <slot></slot>
      </button>
    `;
  }
}
