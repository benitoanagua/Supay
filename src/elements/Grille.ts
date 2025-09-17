import { LitElement, html, unsafeCSS, PropertyValueMap } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-grille")
export class WcGrille extends LitElement {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: Number, reflect: true }) desktop = 3;
  @property({ type: Number, reflect: true }) mobile = 3;
  @property({ type: String, reflect: true }) gap = "medium";

  @state() private isMobile = false;

  @query("slot") private slotElement?: HTMLSlotElement;

  private mediaQuery?: MediaQueryList;

  // Deshabilitar Shadow DOM para usar estilos globales de Tailwind
  protected createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupMediaQuery();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupMediaQuery();
  }

  protected updated(changedProperties: PropertyValueMap<any>) {
    super.updated(changedProperties);
    if (
      changedProperties.has("desktop") ||
      changedProperties.has("mobile") ||
      changedProperties.has("gap")
    ) {
      this.updateGrid();
    }
  }

  private setupMediaQuery() {
    if (typeof window === "undefined") return;

    this.mediaQuery = window.matchMedia("(max-width: 767px)");

    const updateIsMobile = () => {
      this.isMobile = this.mediaQuery!.matches;
      this.updateGrid();
    };

    updateIsMobile();
    this.mediaQuery.addEventListener("change", updateIsMobile);
  }

  private cleanupMediaQuery() {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener("change", this.updateMediaQuery);
    }
  }

  private updateMediaQuery = () => {
    this.isMobile = this.mediaQuery!.matches;
    this.updateGrid();
  };

  private updateGrid() {
    if (!this.slotElement) return;

    // Wait for slot to be assigned
    requestAnimationFrame(() => {
      const assignedNodes = this.slotElement!.assignedNodes();
      const elements = assignedNodes.filter(
        (node): node is HTMLElement =>
          node.nodeType === Node.ELEMENT_NODE && node instanceof HTMLElement,
      );

      elements.forEach((element, index) => {
        this.applyGridStyles(element, index, elements.length);
      });
    });
  }

  private applyGridStyles(
    element: HTMLElement,
    index: number,
    totalLength: number,
  ) {
    const breakpoint = this.isMobile ? this.mobile : this.desktop;
    const gridInfo = this.calculateGrid(breakpoint, index, totalLength);
    const padding = this.gap === "small" ? 8 : this.gap === "medium" ? 16 : 24;

    element.style.boxSizing = "content-box";

    // Calculate width
    const parentWidth = this.clientWidth;
    const itemWidth = Math.floor(
      (parentWidth - 2 * padding * (breakpoint - 1)) / breakpoint,
    );
    const border = (index + 1) % breakpoint !== 0 ? 1 : 0;
    element.style.width = `${itemWidth - border}px`;

    // Reset styles
    element.style.paddingRight = "";
    element.style.marginRight = "";
    element.style.borderRight = "";
    element.style.paddingBottom = "";
    element.style.marginBottom = "";
    element.style.borderBottom = "";
    element.style.borderImage = "";

    let hasRightBorder = false;
    let hasBottomBorder = false;

    // Apply right border/padding
    if (gridInfo.col < breakpoint - 1) {
      element.style.paddingRight = `${padding}px`;
      element.style.marginRight = `${padding}px`;
      element.style.borderRight = "1px solid rgb(245, 245, 245)";
      hasRightBorder = true;
    }

    // Apply bottom border/padding
    if (gridInfo.row < gridInfo.rows) {
      element.style.paddingBottom = `${padding}px`;
      element.style.marginBottom = `${padding}px`;
      element.style.borderBottom = "1px solid rgb(245, 245, 245)";
      hasBottomBorder = true;
    }

    // Apply corner gradient if needed
    if (hasRightBorder && hasBottomBorder) {
      const gradientSize = Math.round((2 * padding * Math.sqrt(2)) / 4 + 1);
      element.style.borderImage = `linear-gradient(315deg, white ${gradientSize}px, rgb(245, 245, 245) 0) 1`;
    }
  }

  private calculateGrid(
    breakpoint: number,
    index: number,
    totalLength: number,
  ) {
    const divInt = Math.floor(totalLength / breakpoint);
    const divMod = totalLength % breakpoint;
    const rows = divMod > 0 ? divInt + 1 : divInt;
    const row = Math.floor(index / breakpoint) + 1;
    const col = index - Math.floor(index / breakpoint) * breakpoint;

    return { rows, row, col };
  }

  private handleSlotChange() {
    this.updateGrid();
  }

  render() {
    return html`
      <div class="flex flex-wrap">
        <slot @slotchange="${this.handleSlotChange}"></slot>
      </div>
    `;
  }
}
