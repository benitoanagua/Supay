import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("strata-icon-button")
export class StrataIconButton extends LitElement {
  static styles = css`
    :host { display: inline-block; }
    button { width:48px; height:48px; padding:0; display:grid; place-items:center; border:0; border-radius:var(--strata-radius-small); background:transparent; color:inherit; cursor:pointer; }
    button:hover { background:var(--strata-color-surface-subtle); }
    button:focus-visible { outline:2px solid currentColor; outline-offset:2px; }
    :host([size="small"]) button { width:40px; height:40px; border-radius:var(--strata-radius-small); }
    :host([size="large"]) button { width:56px; height:56px; border-radius:var(--strata-radius-medium); }
  `;
  @property({ type: String }) size: "small" | "medium" | "large" = "medium";
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) label = "";
  @property({ type: String }) icon = "carbon:add";
  render() {
    return html`<button ?disabled=${this.disabled} aria-label=${this.label || "Action"}><iconify-icon icon=${this.icon} aria-hidden="true"></iconify-icon></button>`;
  }
}
