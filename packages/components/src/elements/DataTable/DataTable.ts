import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
@customElement("strata-data-table")
export class StrataDataTable extends LitElement {
  static styles = css`
    :host {
      display: block;
      overflow: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font: 400 14px/1.4 var(--strata-font-sans);
    }
    th {
      text-align: left;
      font: 700 12px var(--strata-font-sans);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      border-bottom: 2px solid var(--strata-color-border-strong);
      padding: 10px;
    }
    td {
      padding: 10px;
      border-bottom: 1px solid var(--strata-color-border-subtle);
    }
    tbody tr:hover {
      background: var(--strata-color-gray-50);
    }
  `;
  render() {
    return html`<table>
      <slot></slot>
    </table>`;
  }
}
