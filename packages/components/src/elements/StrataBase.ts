import { LitElement, css } from "lit";
import { property } from "lit/decorators.js";

export const strataComponentStyles = css`
  :host {
    display: block;
    font-family: var(--strata-font-sans);
    color: var(--strata-color-text-primary);
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  button,
  input,
  select,
  textarea {
    font: inherit;
  }
  button {
    cursor: pointer;
  }
  button:disabled,
  [aria-disabled="true"] {
    cursor: not-allowed;
  }
  :host {
    --strata-component-radius: var(--strata-radius-medium);
    --strata-component-border: var(--strata-border-medium);
    --strata-component-elevation: var(--strata-elevation-medium);
  }
  :host([size="micro"]) {
    --strata-component-radius: var(--strata-radius-micro);
    --strata-component-border: var(--strata-border-micro);
    --strata-component-elevation: var(--strata-elevation-micro);
  }
  :host([size="small"]) {
    --strata-component-radius: var(--strata-radius-small);
    --strata-component-border: var(--strata-border-small);
    --strata-component-elevation: var(--strata-elevation-small);
  }
  :host([size="large"]) {
    --strata-component-radius: var(--strata-radius-large);
    --strata-component-border: var(--strata-border-large);
    --strata-component-elevation: var(--strata-elevation-large);
  }
  :host([size="hero"]) {
    --strata-component-radius: var(--strata-radius-hero);
    --strata-component-border: var(--strata-border-hero);
    --strata-component-elevation: var(--strata-elevation-hero);
  }
  .strata-title {
    margin: 0;
    font-weight: 500;
  }
  .strata-title--level-1 {
    font-size: 2rem;
  }
  .strata-title--level-2 {
    font-size: 1.75rem;
  }
  .strata-title--level-3 {
    font-size: 1.5rem;
  }
  .strata-title--level-4 {
    font-size: 1.25rem;
  }
  .strata-title--level-5 {
    font-size: 1.125rem;
  }
  .strata-title--level-6 {
    font-size: 1rem;
  }
  .strata-avatar {
    width: 40px;
    height: 40px;
    border-radius: var(--strata-radius-small);
    overflow: hidden;
    display: grid;
    place-items: center;
    background: var(--strata-color-surface-subtle);
    font-weight: 700;
  }
  .strata-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  nav ol {
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
    list-style: none;
    align-items: center;
    flex-wrap: wrap;
  }
  .strata-control-group {
    display: flex;
    gap: 8px;
    flex-direction: row;
  }
  :host([orientation="vertical"]) .strata-control-group {
    flex-direction: column;
  }
  .strata-menu {
    min-width: 180px;
    padding: 4px;
    border-radius: var(--strata-component-radius);
    background: var(--strata-color-surface-raised);
    box-shadow: var(--strata-component-elevation);
  }
  .strata-menu button {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: left;
    border-radius: var(--strata-radius-small);
  }
  .strata-menu button:hover {
    background: var(--strata-color-surface-subtle);
  }
  label {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  fieldset {
    border: 0;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 8px;
  }
  input[type="range"] {
    width: 100%;
    accent-color: var(--strata-color-action-primary);
  }
  .strata-field {
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border: 1px solid var(--strata-color-border-subtle);
    border-radius: var(--strata-radius-small);
    background: var(--strata-color-surface-default);
  }
  .strata-field input {
    border: 0;
    outline: 0;
    min-width: 0;
    flex: 1;
    background: transparent;
    color: inherit;
  }
  .strata-tooltip {
    position: relative;
    display: inline-flex;
  }
  .strata-tooltip [role="tooltip"] {
    position: absolute;
    z-index: 10;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 8px;
    background: var(--strata-color-black);
    color: var(--strata-color-white);
    border-radius: var(--strata-radius-micro);
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
  }
  .strata-tooltip:hover [role="tooltip"],
  .strata-tooltip:focus-within [role="tooltip"] {
    opacity: 1;
  }
  .strata-popover {
    padding: 12px;
    border-radius: var(--strata-component-radius);
    background: var(--strata-color-surface-raised);
    box-shadow: var(--strata-component-elevation);
  }
  .strata-drawer,
  .strata-bottom-sheet {
    background: var(--strata-color-surface-raised);
    box-shadow: var(--strata-elevation-large);
    padding: 16px;
  }
  .strata-drawer {
    position: fixed;
    inset: 0 auto 0 0;
    width: min(88vw, 360px);
    z-index: 100;
  }
  .strata-bottom-sheet {
    position: fixed;
    inset: auto 0 0;
    z-index: 100;
    border-radius: var(--strata-radius-large) var(--strata-radius-large) 0 0;
  }
  .strata-drawer header,
  .strata-bottom-sheet header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .strata-drawer header button,
  .strata-bottom-sheet header button,
  .strata-tag button,
  .strata-stepper button {
    border: 0;
    background: transparent;
    color: inherit;
  }
  .strata-snackbar {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 16px;
    background: var(--strata-color-black);
    color: var(--strata-color-white);
    border-radius: var(--strata-radius-small);
    box-shadow: var(--strata-component-elevation);
  }
  .strata-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 28px;
    padding: 4px 8px;
    border-radius: var(--strata-component-radius);
    background: var(--strata-color-surface-subtle);
  }
  .strata-list {
    display: grid;
  }
  .strata-list-item {
    padding: 12px 0;
    border-bottom: 1px solid var(--strata-color-border-subtle);
  }
  .strata-list-item strong,
  .strata-list-item span {
    display: block;
  }
  .strata-list-item span {
    color: var(--strata-color-text-secondary);
  }
  .strata-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: strata-spin 0.7s linear infinite;
  }
  .strata-file-upload {
    min-height: 100px;
    border: 1px dashed var(--strata-color-border-subtle);
    padding: 16px;
    justify-content: center;
    cursor: pointer;
  }
  .strata-file-upload input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
  }
  .strata-stepper {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    border: 1px solid var(--strata-color-border-subtle);
    border-radius: var(--strata-radius-small);
    padding: 4px;
  }
  .strata-stepper button {
    width: 32px;
    height: 32px;
  }
  @keyframes strata-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export abstract class StrataElement extends LitElement {
  static styles = [strataComponentStyles];
  @property({ type: String, reflect: true }) size:
    "micro" | "small" | "medium" | "large" | "hero" = "medium";
  @property({ type: String }) tone = "neutral";
}
