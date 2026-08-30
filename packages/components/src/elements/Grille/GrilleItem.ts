import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import baseCSS from "../../component-base.css?inline";
import componentCSS from "./Grille.css?inline";

@customElement("strata-grille-item")
export class StrataGrilleItem extends LitElement {
  static styles = [unsafeCSS(baseCSS), unsafeCSS(componentCSS)];

  connectedCallback() {
    super.connectedCallback();
    this.classList.add("strata-grille-item");
  }

  render() {
    return html`
      <div class="strata-grille-item__content">
        <slot></slot>
      </div>
    `;
  }
}
