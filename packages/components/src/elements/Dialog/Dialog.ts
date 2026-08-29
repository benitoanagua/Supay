import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("strata-dialog")
export class StrataDialog extends LitElement {
  static styles = css`
    :host { display: contents; }
    .strata-dialog__backdrop { position: fixed; inset: 0; z-index: 100; background: color-mix(in srgb, var(--strata-color-black) 45%, transparent); display: grid; place-items: center; padding: 20px; }
    .strata-dialog__content { width: min(100%, 560px); max-height: 90vh; overflow: auto; background: var(--strata-color-surface-page); color: var(--strata-color-text-primary); padding: 24px; border: var(--strata-border-large) solid var(--strata-color-border-strong); border-radius: var(--strata-radius-large); box-shadow: var(--strata-elevation-large); }
    .strata-dialog__content:focus-visible { outline: 2px solid var(--strata-color-focus-ring); outline-offset: 3px; }
  `;
  @property({ type: Boolean, reflect: true }) open = false;
  @property() title = "";
  @state() private labelledBy = "";
  private previouslyFocused: HTMLElement | null = null;
  private static nextId = 0;

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("open")) this.open ? this.openDialog() : this.closeDialog();
  }
  disconnectedCallback() { this.restoreFocus(); super.disconnectedCallback(); }
  private openDialog() {
    this.previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.labelledBy = this.title ? `dialog-title-${++StrataDialog.nextId}` : "";
    queueMicrotask(() => {
      const content = this.renderRoot.querySelector<HTMLElement>(".strata-dialog__content");
      const first = content?.querySelector<HTMLElement>("button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])");
      (first || content)?.focus();
    });
  }
  private closeDialog() { this.restoreFocus(); }
  private restoreFocus() { this.previouslyFocused?.focus(); this.previouslyFocused = null; }
  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const content = this.renderRoot.querySelector<HTMLElement>(".strata-dialog__content");
    if (!content) return;
    const items = [...content.querySelectorAll<HTMLElement>("button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])")];
    if (!items.length) { e.preventDefault(); content.focus(); return; }
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  render() {
    if (!this.open) return html``;
    return html`<div class="strata-dialog__backdrop" @click=${(e: Event) => { if (e.target === e.currentTarget) this.open = false; }}><section class="strata-dialog__content" role="dialog" aria-modal="true" aria-labelledby=${this.labelledBy || undefined} tabindex="-1" @keydown=${this.handleKeydown}>${this.title ? html`<h2 id=${this.labelledBy}>${this.title}</h2>` : ""}<slot></slot></section></div>`;
  }
}
