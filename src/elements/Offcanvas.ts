import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-offcanvas")
export class WcOffcanvas extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @state() private showOffcanvas = false;

  // Deshabilitar Shadow DOM para usar estilos globales de Tailwind
  protected createRenderRoot() {
    return this;
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
    // Restore body overflow when component is destroyed
    document.body.style.overflow = "auto";
  }

  render() {
    return html`
      <button
        class="cursor-pointer border-0 bg-white p-0"
        @click="${this.toggleOffcanvas}"
      >
        <slot name="open"></slot>
      </button>

      ${this.showOffcanvas
        ? html`
            <div class="fixed top-0 left-0 w-full h-full bg-black/75 z-50">
              <div class="relative h-full w-80 bg-white p-4 z-1">
                <button
                  class="absolute right-0 top-0 cursor-pointer border-0 bg-white p-0"
                  @click="${this.toggleOffcanvas}"
                  aria-label="Close offcanvas"
                >
                  <span class="block h-6 w-6 i-ri-close-line"></span>
                </button>
                <div>
                  <slot name="content"></slot>
                </div>
              </div>
            </div>
          `
        : ""}
    `;
  }
}
