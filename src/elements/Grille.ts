import { LitElement, html, css } from "lit";
import { property, query } from "lit/decorators.js";

export class WcGrille extends LitElement {
  @property({ type: Number })
  desktop = 3;

  @property({ type: Number })
  mobile = 2;

  @property({ type: String })
  gap = "medium";

  @query("slot")
  slot!: HTMLSlotElement;

  @query(".grille-container")
  container!: HTMLElement;

  static styles = css`
    .grille-container {
      display: flex;
      flex-wrap: wrap;
    }
  `;

  firstUpdated() {
    this.setupResizeObserver();
    this.gridRendering();
  }

  updated() {
    this.gridRendering();
  }

  setupResizeObserver() {
    if (this.container && window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        this.gridRendering();
      });
      resizeObserver.observe(this.container);
    }

    // Fallback para cambios de viewport
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
    if (!this.slot || !this.container) return;

    const assignedElements = this.slot.assignedElements();

    assignedElements.forEach((element: Element, i: number) => {
      // Type guard para asegurar que es HTMLElement
      if (!(element instanceof HTMLElement)) return;

      // Reset styles
      element.style.cssText = "";

      const isMobile = window.innerWidth < 768;
      const columns = isMobile ? this.mobile : this.desktop;
      const dsk = this.grid(this.desktop, i, assignedElements.length);
      const mbl = this.grid(this.mobile, i, assignedElements.length);

      const padding =
        this.gap === "small" ? 8 : this.gap === "medium" ? 16 : 24;

      element.style.boxSizing = "content-box";

      // Calcular ancho
      if (isMobile) {
        const widthM = Math.floor(
          (this.container.clientWidth - 2 * padding * (this.mobile - 1)) /
            this.mobile
        );
        const borderM = (i + 1) % this.mobile !== 0 ? 1 : 0;
        element.style.width = `${widthM - borderM}px`;
      } else {
        const widthd = Math.floor(
          (this.container.clientWidth - 2 * padding * (this.desktop - 1)) /
            this.desktop
        );
        const borderD = (i + 1) % this.desktop !== 0 ? 1 : 0;
        element.style.width = `${widthd - borderD}px`;
      }

      let hasRightBorder = false;
      let hasBottomBorder = false;
      const borderColor = "rgb(126, 126, 126)";

      // Línea derecha
      if (
        (dsk.col < this.desktop - 1 && !isMobile) ||
        (mbl.col < this.mobile - 1 && isMobile)
      ) {
        element.style.paddingRight = `${padding}px`;
        element.style.marginRight = `${padding}px`;
        element.style.borderRight = `1px solid ${borderColor}`;
        hasRightBorder = true;
      }

      // Línea abajo
      if (
        (dsk.row < dsk.rows && !isMobile) ||
        (mbl.row < mbl.rows && isMobile)
      ) {
        element.style.paddingBottom = `${padding}px`;
        element.style.marginBottom = `${padding}px`;
        element.style.borderBottom = `1px solid ${borderColor}`;
        hasBottomBorder = true;
      }

      // Esquina (donde se cruzan las líneas)
      if (hasRightBorder && hasBottomBorder) {
        const gradientSize = Math.round((2 * padding * Math.sqrt(2)) / 4 + 1);
        element.style.borderImage = `linear-gradient(315deg, white ${gradientSize}px, ${borderColor} 0) 1`;
      }
    });
  }

  render() {
    return html`
      <div class="grille-container">
        <slot @slotchange=${this.gridRendering}></slot>
      </div>
    `;
  }
}

customElements.define("wc-grille", WcGrille);
