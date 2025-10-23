import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-offcanvas")
export class WcOffcanvas extends LitElement {
  static styles = unsafeCSS(mainCSS);

  @state() private showOffcanvas = false;

  protected createRenderRoot() {
    const shadowRoot = super.createRenderRoot();
    const style = document.createElement("style");
    style.textContent = (mainCSS as any).toString();
    shadowRoot.appendChild(style);
    return shadowRoot;
  }

  private toggleOffcanvas() {
    this.showOffcanvas = !this.showOffcanvas;

    if (this.showOffcanvas) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.body.style.overflow = "auto";
  }

  render() {
    return html`
      <button
        class="metro-offcanvas-toggle"
        @click="${this.toggleOffcanvas}"
        aria-label="Open navigation menu"
      >
        <span class="metro-offcanvas-toggle-icon"></span>
      </button>

      ${this.showOffcanvas
        ? html`
            <div
              class="metro-offcanvas-overlay"
              @click="${this.toggleOffcanvas}"
            >
              <div
                class="metro-offcanvas-panel"
                @click="${(e: Event) => e.stopPropagation()}"
              >
                <button
                  class="metro-offcanvas-close"
                  @click="${this.toggleOffcanvas}"
                  aria-label="Close offcanvas"
                >
                  <span class="metro-offcanvas-close-icon"></span>
                </button>
                <div class="metro-offcanvas-content">
                  <slot></slot>
                </div>
              </div>
            </div>
          `
        : ""}
    `;
  }
}
