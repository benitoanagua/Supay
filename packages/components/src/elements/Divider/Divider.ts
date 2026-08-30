import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
@customElement("strata-divider")
export class StrataDivider extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .divider {
      border: 0;
      border-top: var(--strata-border-small) solid
        var(--strata-color-border-subtle);
    }
    :host([variant="double"]) .divider {
      border-top-width: var(--strata-editorial-divider-double);
      border-bottom: var(--strata-border-small) solid
        var(--strata-color-border-subtle);
      padding-top: var(--strata-editorial-divider-double);
    }
    :host([variant="dashed"]) .divider {
      border-top-style: dashed;
    }
  `;
  @property({ reflect: true }) variant: "solid" | "double" | "dashed" = "solid";
  render() {
    return html`<hr class="strata-divider" role="separator" />`;
  }
}
