import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import baseCSS from "../../component-base.css?inline";
import componentCSS from "./Modal.css?inline";
import type {
  ModalSize,
  ModalPosition,
  ModalVariant,
  ModalAnimation,
} from "../../types/modal.js";

@customElement("strata-modal")
export class StrataModal extends LitElement {
  static styles = [unsafeCSS(baseCSS), unsafeCSS(componentCSS)];

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
  private previousBodyOverflow = "";
  private bodyScrollLocked = false;
  private previouslyFocused: HTMLElement | null = null;
  private readonly titleId = `strata-modal-title-${Math.random().toString(36).slice(2)}`;

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

  protected updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has("closeOnEscape")) {
      this.cleanupEscapeListener();
      if (this.closeOnEscape) this.setupEscapeListener();
    }

    if (changedProperties.has("open")) {
      if (this.open) {
        this.handleOpen();
      } else {
        this.handleClose();
      }
    }
  }

  private handleOpen() {
    this.previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    if (this.preventScroll) {
      this.preventBodyScroll();
    }

    // Dispatch open event
    this.dispatchEvent(
      new CustomEvent("modal-open", {
        bubbles: true,
        composed: true,
      }),
    );

    // Focus trap
    this.setupFocusTrap();
  }

  private handleClose() {
    this.restoreBodyScroll();
    if (this.previouslyFocused) {
      this.previouslyFocused.focus();
      this.previouslyFocused = null;
    }

    // Dispatch close event
    this.dispatchEvent(
      new CustomEvent("modal-close", {
        bubbles: true,
        composed: true,
      }),
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
    if (this.bodyScrollLocked) return;
    this.previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    this.bodyScrollLocked = true;
  }

  private restoreBodyScroll() {
    if (!this.bodyScrollLocked) return;
    document.body.style.overflow = this.previousBodyOverflow;
    this.bodyScrollLocked = false;
  }

  private setupFocusTrap() {
    setTimeout(() => {
      const modal =
        this.shadowRoot?.querySelector<HTMLElement>(".strata-modal");
      const first = modal?.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      (first || modal)?.focus();
    }, 0);
  }

  private handleModalKeydown = (event: KeyboardEvent) => {
    if (event.key !== "Tab") return;
    const modal = event.currentTarget as HTMLElement;
    const items = [
      ...modal.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ];
    if (!items.length) {
      event.preventDefault();
      modal.focus();
      return;
    }
    const first = items[0],
      last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  private getModalClasses() {
    const classes = [
      "strata-modal",
      `strata-modal--${this.size}`,
      `strata-modal--${this.variant}`,
    ];

    if (this.animation !== "slide-up") {
      classes.push(`strata-modal--${this.animation}`);
    }

    if (this.isClosing) {
      classes.push("strata-modal--closing");
    }

    return classes.join(" ");
  }

  private getContainerClasses() {
    const classes = ["strata-modal-container"];

    if (this.position !== "center") {
      classes.push(`strata-modal-container--${this.position}`);
    }

    return classes.join(" ");
  }

  private getOverlayClasses() {
    const classes = ["strata-modal-overlay"];

    if (this.isClosing) {
      classes.push("strata-modal-overlay--closing");
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
          aria-labelledby=${this.title ? this.titleId : undefined}
          @click="${(e: Event) => e.stopPropagation()}"
          @keydown="${this.handleModalKeydown}"
          tabindex="-1"
        >
          <!-- Close Button -->
          ${
            this.showClose
              ? html`
                  <button
                    class="strata-modal__close"
                    @click="${this.closeModal}"
                    aria-label="Close modal"
                  >
                    <iconify-icon
                      class="strata-modal__close-icon"
                      icon="carbon:close"
                      aria-hidden="true"
                    ></iconify-icon>
                  </button>
                `
              : ""
          }

          <!-- Header -->
          ${
            this.title
              ? html`
                  <div class="strata-modal__header">
                    <h2 class="strata-modal__title" id=${this.titleId}>
                      ${this.title}
                    </h2>
                  </div>
                `
              : html`<slot name="header"></slot>`
          }

          <!-- Body -->
          <div class="strata-modal__body">
            <slot></slot>
          </div>

          <!-- Footer -->
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}
