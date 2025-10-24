import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import mainCSS from "../../main.css?inline";
import type {
  ModalSize,
  ModalPosition,
  ModalVariant,
  ModalAnimation,
} from "../../types/modal.js";

@customElement("wc-modal")
export class WcModal extends LitElement {
  static styles = unsafeCSS(mainCSS);

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) title = "";
  @property({ type: String }) size: ModalSize = "medium";
  @property({ type: String }) position: ModalPosition = "center";
  @property({ type: String }) variant: ModalVariant = "default";
  @property({ type: String }) animation: ModalAnimation = "slide-up";
  @property({ type: Boolean, attribute: "close-on-overlay" })
  closeOnOverlay = true;
  @property({ type: Boolean, attribute: "close-on-escape" })
  closeOnEscape = true;
  @property({ type: Boolean, attribute: "show-close" }) showClose = true;
  @property({ type: Boolean, attribute: "prevent-scroll" })
  preventScroll = true;

  @state() private isClosing = false;

  // Deshabilitar Shadow DOM para usar estilos globales de Tailwind
  protected createRenderRoot() {
    const shadowRoot = super.createRenderRoot();

    // Aplicar estilos globales manualmente
    const style = document.createElement("style");
    style.textContent = (mainCSS as any).toString();
    shadowRoot.appendChild(style);

    return shadowRoot;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.closeOnEscape) {
      this.setupEscapeListener();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupEscapeListener();
    this.restoreBodyScroll();
  }

  protected updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has("open")) {
      if (this.open) {
        this.handleOpen();
      } else {
        this.handleClose();
      }
    }
  }

  private handleOpen() {
    if (this.preventScroll) {
      this.preventBodyScroll();
    }

    // Dispatch open event
    this.dispatchEvent(
      new CustomEvent("modal-open", {
        bubbles: true,
        composed: true,
      })
    );

    // Focus trap
    this.setupFocusTrap();
  }

  private handleClose() {
    this.restoreBodyScroll();

    // Dispatch close event
    this.dispatchEvent(
      new CustomEvent("modal-close", {
        bubbles: true,
        composed: true,
      })
    );
  }

  private closeModal() {
    if (this.isClosing) return;

    this.isClosing = true;

    // Dispatch before-close event (cancelable)
    const beforeCloseEvent = new CustomEvent("modal-before-close", {
      bubbles: true,
      composed: true,
      cancelable: true,
    });

    const shouldClose = this.dispatchEvent(beforeCloseEvent);

    if (shouldClose) {
      // Wait for animation to complete
      setTimeout(() => {
        this.open = false;
        this.isClosing = false;
      }, 300); // Match CSS animation duration
    } else {
      this.isClosing = false;
    }
  }

  private handleOverlayClick(e: MouseEvent) {
    if (this.closeOnOverlay && e.target === e.currentTarget) {
      this.closeModal();
    }
  }

  private setupEscapeListener() {
    window.addEventListener("keydown", this.handleEscape);
  }

  private cleanupEscapeListener() {
    window.removeEventListener("keydown", this.handleEscape);
  }

  private handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && this.open) {
      this.closeModal();
    }
  };

  private preventBodyScroll() {
    document.body.classList.add("wc-modal-open");
    document.body.style.overflow = "hidden";
  }

  private restoreBodyScroll() {
    document.body.classList.remove("wc-modal-open");
    document.body.style.overflow = "";
  }

  private setupFocusTrap() {
    // Focus first focusable element inside modal
    setTimeout(() => {
      const modal = this.shadowRoot?.querySelector(".wc-modal");
      if (modal) {
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        firstElement?.focus();
      }
    }, 100);
  }

  private getModalClasses() {
    const classes = [
      "wc-modal",
      `wc-modal--${this.size}`,
      `wc-modal--${this.variant}`,
    ];

    if (this.animation !== "slide-up") {
      classes.push(`wc-modal--${this.animation}`);
    }

    if (this.isClosing) {
      classes.push("wc-modal--closing");
    }

    return classes.join(" ");
  }

  private getContainerClasses() {
    const classes = ["wc-modal-container"];

    if (this.position !== "center") {
      classes.push(`wc-modal-container--${this.position}`);
    }

    return classes.join(" ");
  }

  private getOverlayClasses() {
    const classes = ["wc-modal-overlay"];

    if (this.isClosing) {
      classes.push("wc-modal-overlay--closing");
    }

    return classes.join(" ");
  }

  render() {
    if (!this.open && !this.isClosing) {
      return html``;
    }

    return html`
      <!-- Overlay -->
      <div
        class="${this.getOverlayClasses()}"
        @click="${this.handleOverlayClick}"
        aria-hidden="true"
      ></div>

      <!-- Modal Container -->
      <div
        class="${this.getContainerClasses()}"
        @click="${this.handleOverlayClick}"
      >
        <!-- Modal -->
        <div
          class="${this.getModalClasses()}"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          @click="${(e: Event) => e.stopPropagation()}"
        >
          <!-- Close Button -->
          ${this.showClose
            ? html`
                <button
                  class="wc-modal__close"
                  @click="${this.closeModal}"
                  aria-label="Close modal"
                >
                  <span
                    class="wc-modal__close-icon icon-[carbon--close]"
                  ></span>
                </button>
              `
            : ""}

          <!-- Header -->
          ${this.title
            ? html`
                <div class="wc-modal__header">
                  <h2 class="wc-modal__title" id="modal-title">
                    ${this.title}
                  </h2>
                </div>
              `
            : html`<slot name="header"></slot>`}

          <!-- Body -->
          <div class="wc-modal__body">
            <slot></slot>
          </div>

          <!-- Footer -->
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}
