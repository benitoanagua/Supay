import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import mainCSS from "../../main.css?inline";
import { ThemeAwareMixin } from "../../mixins/ThemeAwareMixin.js";

const ThemeAwareBase = ThemeAwareMixin(LitElement);

@customElement("strata-grille-item")
export class StrataGrilleItem extends ThemeAwareBase {
  static styles = [unsafeCSS(mainCSS)];

  protected createRenderRoot() {
    const shadowRoot = super.createRenderRoot();

    const themeStyle = document.createElement("style");
    themeStyle.id = "theme-vars";
    shadowRoot.appendChild(themeStyle);

    return shadowRoot;
  }

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
