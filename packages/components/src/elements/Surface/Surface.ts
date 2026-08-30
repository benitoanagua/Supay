import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
@customElement("strata-surface")
export class StrataSurface extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .strata-surface {
      padding: var(--strata-space-6);
      border-radius: var(--strata-radius-medium);
      border: var(--strata-border-medium) solid transparent;
      background: var(--strata-color-surface-raised);
      box-shadow: var(--strata-elevation-medium);
    }
    :host([size="small"]) .strata-surface {
      padding: var(--strata-space-4);
      border-radius: var(--strata-radius-small);
      border-width: var(--strata-border-small);
      box-shadow: var(--strata-elevation-small);
    }
    :host([size="large"]) .strata-surface {
      padding: var(--strata-space-8);
      border-radius: var(--strata-radius-large);
      border-width: var(--strata-border-large);
      box-shadow: var(--strata-elevation-large);
    }
    :host([size="hero"]) .strata-surface {
      padding: var(--strata-space-10);
      border-radius: var(--strata-radius-hero);
      border-width: var(--strata-border-hero);
      box-shadow: var(--strata-elevation-hero);
    }
    :host([outlined]) .strata-surface {
      border-color: var(--strata-color-border-subtle);
      box-shadow: none;
    }
  `;
  @property() size: "small" | "medium" | "large" | "hero" = "medium";
  @property({ type: Boolean, reflect: true }) outlined = false;
  render() {
    return html`<section class="strata-surface"><slot></slot></section>`;
  }
}
