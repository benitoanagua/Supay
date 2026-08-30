import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import baseCSS from "../../component-base.css?inline";
import componentCSS from "./Button.css?inline";
import type {
  StrataIconName,
  ButtonVariant,
  ButtonSize,
  ButtonColor,
  ButtonType,
} from "../../types/button.js";

@customElement("strata-button")
export class StrataButton extends LitElement {
  static styles = [unsafeCSS(baseCSS), unsafeCSS(componentCSS)];

  @property({ type: String }) label = "";
  @property({ type: String }) variant: ButtonVariant = "outlined";
  @property({ type: String }) size: ButtonSize = "medium";
  @property({ type: String }) color: ButtonColor = "primary";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) href = "";
  @property({ type: String }) type: ButtonType = "button";
  @property({ type: String }) icon: StrataIconName | "" = "";
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

    const button = this.renderRoot.querySelector(
      ".strata-button",
    ) as HTMLElement;
    if (!button) return;

    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.classList.add("strata-button__ripple-effect");
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    const rippleContainer = this.renderRoot.querySelector(
      ".strata-button__ripple",
    );
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
      "strata-button",
      `strata-button--variant-${this.variant}`,
      `strata-button--size-${this.size}`,
      `strata-button--color-${this.color}`,
    ];

    if (this.disabled) classes.push("strata-button--disabled");
    if (this.loading) classes.push("strata-button--loading");
    if (this.fullWidth) classes.push("strata-button--full-width");
    if (this.href) classes.push("strata-button--as-link");

    return classes.join(" ");
  }

  private renderIcon() {
    if (!this.icon) return null;
    if (!this.icon.startsWith("carbon:")) return null;

    const iconClass = `strata-button__icon ${
      this.trailingIcon
        ? "strata-button__icon--trailing"
        : "strata-button__icon--leading"
    }`;

    return html`<iconify-icon
      class="${iconClass}"
      icon=${this.icon}
      aria-hidden="true"
    ></iconify-icon>`;
  }

  private renderContent() {
    if (this.loading) {
      return html`
        <span class="strata-button__loading">
          <span class="strata-button__spinner"></span>
        </span>
        <span class="strata-button__label strata-button__label--hidden"
          >${this.label}</span
        >
      `;
    }

    return html`
      ${!this.trailingIcon ? this.renderIcon() : ""}
      <span class="strata-button__label">${this.label}</span>
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
          <span class="strata-button__ripple"></span>
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
        <span class="strata-button__ripple"></span>
        ${this.renderContent()}
      </button>
    `;
  }
}
