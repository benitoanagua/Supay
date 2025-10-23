import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-grille")
export class WcGrille extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Number }) desktop = 3;
  @property({ type: Number }) mobile = 1;
  @property({ type: String }) gap = "medium";

  @query("slot", true)
  private slotElement!: HTMLSlotElement;

  @query(".metro-grille__container", true)
  private containerElement!: HTMLElement;

  firstUpdated() {
    this.setupResizeObserver();
    this.gridRendering();
  }

  updated() {
    this.gridRendering();
  }

  setupResizeObserver() {
    if (this.containerElement && window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        this.gridRendering();
      });
      resizeObserver.observe(this.containerElement);
    }

    window.addEventListener("resize", () => {
      setTimeout(() => this.gridRendering(), 100);
    });
  }

  grid(breakpoint: number, index: number, length: number) {
    const divInt = Math.floor(length / breakpoint);
    const divMod = length % breakpoint;
    const rows = divMod > 0 ? divInt + 1 : divInt;
    const row = Math.floor(index / breakpoint) + 1;
    const col = index - Math.floor(index / breakpoint) * breakpoint;
    return { rows, row, col };
  }

  gridRendering() {
    if (!this.slotElement || !this.containerElement) return;

    const assignedElements = this.slotElement.assignedElements();
    const isMobile = window.innerWidth < 768;
    const currentBreakpoint = isMobile ? this.mobile : this.desktop;

    assignedElements.forEach((element: Element, i: number) => {
      if (!(element instanceof HTMLElement)) return;

      // Reset styles
      element.style.cssText = "";

      const grid = this.grid(currentBreakpoint, i, assignedElements.length);
      const padding =
        this.gap === "small" ? 8 : this.gap === "medium" ? 16 : 24;

      element.style.boxSizing = "content-box";

      // Calcular ancho responsive
      const containerWidth = this.containerElement.clientWidth;
      const itemWidth = Math.floor(
        (containerWidth - 2 * padding * (currentBreakpoint - 1)) /
          currentBreakpoint
      );

      element.style.width = `${itemWidth}px`;

      // Bordes Metro (solo líneas rectas)
      let hasRightBorder = false;
      let hasBottomBorder = false;
      const borderColor = "var(--color-outlineVariant)";

      // Línea derecha
      if (grid.col < currentBreakpoint - 1) {
        element.style.paddingRight = `${padding}px`;
        element.style.borderRight = `1px solid ${borderColor}`;
        hasRightBorder = true;
      }

      // Línea abajo
      if (grid.row < grid.rows) {
        element.style.paddingBottom = `${padding}px`;
        element.style.borderBottom = `1px solid ${borderColor}`;
        hasBottomBorder = true;
      }

      // Esquina (donde se cruzan las líneas)
      if (hasRightBorder && hasBottomBorder) {
        const gradientSize = Math.round((2 * padding * Math.sqrt(2)) / 4 + 1);
        element.style.borderImage = `linear-gradient(315deg, transparent ${gradientSize}px, ${borderColor} 0) 1`;
      }
    });
  }

  render() {
    return html`
      <div class="metro-grille__container metro-grille--gap-${this.gap}">
        <slot @slotchange=${this.gridRendering}></slot>
      </div>
    `;
  }
}
