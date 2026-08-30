import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
@customElement("strata-badge")
export class StrataBadge extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    .strata-badge {
      font: 600 12px/1 var(--strata-font-sans);
      padding: 4px 7px;
      border-radius: var(--strata-radius-small);
      border: 0;
    }
    .strata-badge--red {
      background: color-mix(in srgb, var(--strata-color-red) 14%, transparent);
      color: var(--strata-color-red);
    }
    .strata-badge--orange {
      background: color-mix(
        in srgb,
        var(--strata-color-orange) 14%,
        transparent
      );
      color: var(--strata-color-orange);
    }
    .strata-badge--yellow {
      background: color-mix(
        in srgb,
        var(--strata-color-yellow) 16%,
        transparent
      );
      color: var(--strata-color-yellow);
    }
    .strata-badge--green {
      background: color-mix(
        in srgb,
        var(--strata-color-green) 14%,
        transparent
      );
      color: var(--strata-color-green);
    }
    .strata-badge--blue {
      background: color-mix(in srgb, var(--strata-color-blue) 14%, transparent);
      color: var(--strata-color-blue);
    }
    .strata-badge--indigo {
      background: color-mix(
        in srgb,
        var(--strata-color-indigo) 14%,
        transparent
      );
      color: var(--strata-color-indigo);
    }
    .strata-badge--violet {
      background: color-mix(
        in srgb,
        var(--strata-color-violet) 14%,
        transparent
      );
      color: var(--strata-color-violet);
    }
  `;
  @property({ reflect: true }) tone:
    "red" | "orange" | "yellow" | "green" | "blue" | "indigo" | "violet" =
    "blue";
  render() {
    return html`<span class="strata-badge strata-badge--${this.tone}"
      ><slot></slot
    ></span>`;
  }
}
