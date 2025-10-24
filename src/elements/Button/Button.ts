import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import mainCSS from "../../main.css?inline";
import type {
  ButtonVariant,
  ButtonSize,
  ButtonColor,
  ButtonType,
} from "../../types/button.js";

@customElement("wc-button")
export class WcButton extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: String }) label = "";
  @property({ type: String }) variant: ButtonVariant = "outlined";
  @property({ type: String }) size: ButtonSize = "medium";
  @property({ type: String }) color: ButtonColor = "primary";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) href = "";
  @property({ type: String }) type: ButtonType = "button";
  @property({ type: String }) icon = "";
  @property({ type: Boolean, attribute: "trailing-icon" }) trailingIcon = false;
  @property({ type: Boolean, attribute: "full-width" }) fullWidth = false;

  protected createRenderRoot() {
    return this;
  }

  private handleClick(e: Event) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    this.createRippleEffect(e as MouseEvent);
  }

  private createRippleEffect(event: MouseEvent) {
    if (this.loading || this.disabled) return;

    const button = this.renderRoot.querySelector(".wc-button") as HTMLElement;
    if (!button) return;

    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.classList.add("wc-button__ripple-effect");
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    const rippleContainer = this.renderRoot.querySelector(".wc-button__ripple");
    if (rippleContainer) {
      rippleContainer.appendChild(ripple);

      // Remover el efecto después de la animación
      setTimeout(() => {
        if (ripple.parentNode === rippleContainer) {
          rippleContainer.removeChild(ripple);
        }
      }, 600);
    }
  }

  private getButtonClasses() {
    const classes = [
      "wc-button",
      `wc-button--variant-${this.variant}`,
      `wc-button--size-${this.size}`,
      `wc-button--color-${this.color}`,
    ];

    if (this.disabled) classes.push("wc-button--disabled");
    if (this.loading) classes.push("wc-button--loading");
    if (this.fullWidth) classes.push("wc-button--full-width");
    if (this.href) classes.push("wc-button--as-link");

    return classes.join(" ");
  }

  private renderIcon() {
    if (!this.icon) return null;

    const iconClass = `wc-button__icon ${
      this.trailingIcon
        ? "wc-button__icon--trailing"
        : "wc-button__icon--leading"
    }`;

    return html`<span class="${iconClass}" icon="${this.icon}"></span>`;
  }

  private renderContent() {
    if (this.loading) {
      return html`
        <span class="wc-button__loading">
          <span class="wc-button__spinner"></span>
        </span>
        <span class="wc-button__label opacity-0">${this.label}</span>
      `;
    }

    return html`
      ${!this.trailingIcon ? this.renderIcon() : ""}
      <span class="wc-button__label">${this.label}</span>
      ${this.trailingIcon ? this.renderIcon() : ""}
    `;
  }

  render() {
    const classes = this.getButtonClasses();

    if (this.href && !this.disabled && !this.loading) {
      return html`
        <a
          class="${classes}"
          href="${this.href}"
          role="button"
          aria-label="${this.label}"
          @click="${this.handleClick}"
        >
          <span class="wc-button__ripple"></span>
          ${this.renderContent()}
        </a>
      `;
    }

    return html`
      <button
        class="${classes}"
        ?disabled="${this.disabled || this.loading}"
        type="${this.type}"
        aria-label="${this.label}"
        @click="${this.handleClick}"
      >
        <span class="wc-button__ripple"></span>
        ${this.renderContent()}
      </button>
    `;
  }
}
