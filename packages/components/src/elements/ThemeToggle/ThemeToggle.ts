import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import baseCSS from "../../component-base.css?inline";
import componentCSS from "./ThemeToggle.css?inline";
import type { ThemeChangeEvent, ThemeMode } from "../../types/events.js";

@customElement("strata-theme-toggle")
export class StrataThemeToggle extends LitElement {
  static styles = [unsafeCSS(baseCSS), unsafeCSS(componentCSS)];

  @state() private currentTheme: ThemeMode = "light";

  connectedCallback() {
    super.connectedCallback();
    this.loadTheme();
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem("strata-theme") as ThemeMode | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    this.currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    this.applyTheme(this.currentTheme, false);
  }

  private applyTheme(theme: ThemeMode, dispatchEvent = true) {
    const htmlElement = document.documentElement;

    if (theme === "dark") {
      htmlElement.setAttribute("data-theme", "dark");
    } else {
      htmlElement.setAttribute("data-theme", "light");
    }

    this.currentTheme = theme;
    localStorage.setItem("strata-theme", theme);

    this.setAttribute("data-theme", theme);

    // Dispatch global event
    if (dispatchEvent) {
      const themeChangeEvent: ThemeChangeEvent = new CustomEvent(
        "theme-change",
        {
          detail: { theme },
        }
      ) as ThemeChangeEvent;

      window.dispatchEvent(themeChangeEvent);
    }
  }

  private toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.applyTheme(newTheme);
  }

  private getThemeLabel() {
    return this.currentTheme === "light"
      ? "Switch to dark mode"
      : "Switch to light mode";
  }

  render() {
    const themeLabel = this.getThemeLabel();

    return html`
      <button
        class="strata-theme-toggle"
        @click="${this.toggleTheme}"
        aria-label="${themeLabel}"
        title="${themeLabel}"
        data-theme="${this.currentTheme}"
      >
        ${this.currentTheme === "light"
          ? html`
              <iconify-icon class="strata-theme-toggle-icon" icon="carbon:sun" aria-hidden="true"></iconify-icon>
            `
          : html`
              <iconify-icon class="strata-theme-toggle-icon" icon="carbon:moon" aria-hidden="true"></iconify-icon>
            `}

        <!-- Visual mode indicator -->
        <span class="strata-theme-toggle-badge">
          ${this.currentTheme === "light" ? "L" : "D"}
        </span>
      </button>
    `;
  }
}
