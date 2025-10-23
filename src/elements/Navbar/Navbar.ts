import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-navbar")
export class WcNavbar extends LitElement {
  static styles = unsafeCSS(mainCSS);

  @state() private isSticky = false;
  @query(".metro-navbar") private navbarElement?: HTMLElement;

  private intersectionObserver?: IntersectionObserver;
  private scrollY = 0;
  private elementTop = 0;

  protected createRenderRoot() {
    const shadowRoot = super.createRenderRoot();
    const style = document.createElement("style");
    style.textContent = (mainCSS as any).toString();
    shadowRoot.appendChild(style);
    return shadowRoot;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setupScrollListener();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupObservers();
    this.cleanupScrollListener();
  }

  protected firstUpdated() {
    this.setupIntersectionObserver();
    this.updateElementPosition();
  }

  private setupScrollListener() {
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", this.handleScroll, { passive: true });
  }

  private cleanupScrollListener() {
    if (typeof window === "undefined") return;
    window.removeEventListener("scroll", this.handleScroll);
  }

  private handleScroll = () => {
    this.scrollY = window.scrollY;
    this.updateStickyState();
  };

  private updateElementPosition() {
    if (this.navbarElement) {
      this.elementTop =
        this.navbarElement.getBoundingClientRect().top + this.scrollY;
    }
  }

  private updateStickyState() {
    this.isSticky = this.scrollY > this.elementTop;
  }

  private setupIntersectionObserver() {
    if (typeof window === "undefined" || !this.navbarElement) return;

    this.cleanupObservers();

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.isSticky =
            !entry.isIntersecting && this.scrollY > this.elementTop;
        });
      },
      {
        threshold: 0,
        rootMargin: "0px",
      }
    );

    this.intersectionObserver.observe(this.navbarElement);
  }

  private cleanupObservers() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = undefined;
    }
  }

  private getNavbarClasses() {
    return this.isSticky ? "metro-navbar metro-navbar--sticky" : "metro-navbar";
  }

  render() {
    return html`
      <nav class="${this.getNavbarClasses()}">
        <div class="metro-navbar__container">
          <div class="metro-navbar__logo">
            <slot name="logo"></slot>
          </div>

          <div class="metro-navbar__navigation">
            <slot name="navigation"></slot>
          </div>

          <div class="metro-navbar__actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </nav>
    `;
  }
}
