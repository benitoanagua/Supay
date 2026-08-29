import { LitElement, html, PropertyValues, unsafeCSS } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import baseCSS from "../../component-base.css?inline";
import componentCSS from "./Card.css?inline";
import type {
  CardHeading,
  CardDensity,
  CardMediaAlign,
  CardMediaWidth,
  CardAspectRatio,
} from "../../types/card.js";
import { TitleRendererMixin } from "../../mixins/TitleRenderer.js";

// Aplicar el mixin a la clase base
const BaseClass = TitleRendererMixin(LitElement);

@customElement("strata-card")
export class StrataCard extends BaseClass {
  static styles = [unsafeCSS(baseCSS), unsafeCSS(componentCSS)];

  @property({ type: String }) title = "";
  @property({ type: String }) url = "";
  @property({ type: String }) excerpt = "";
  @property({ type: String, attribute: "feature-image" }) feature_image = "";
  @property({ type: String, attribute: "tag-name" }) tag_name = "";
  @property({ type: String, attribute: "tag-url" }) tag_url = "";
  @property({ type: String, attribute: "author-name" }) author_name = "";
  @property({ type: String, attribute: "author-url" }) author_url = "";
  @property({ type: String, attribute: "author-profile-image" })
  author_profile_image = "";
  @property({ type: String, attribute: "media-align" })
  media_align: CardMediaAlign = "left";
  @property({ type: String, attribute: "media-width" })
  media_width: CardMediaWidth = "is-half";
  @property({ type: Number, reflect: true }) heading: CardHeading = 4;
  @property({ type: String }) density: CardDensity = "normal";
  @property({ type: String, reflect: true }) size: "small" | "medium" | "large" | "hero" = "medium";
  @property({ type: String, attribute: "aspect-ratio" })
  aspect_ratio: CardAspectRatio = "monitor";
  @property({ type: String, attribute: "reading-time" }) reading_time = "";
  @property({ type: String, attribute: "published-at" }) published_at = "";
  @property({ type: Boolean, reflect: true }) bordered = false;

  @state() private imageSize = { width: 0, height: 0 };

  @query("img") private imageElement?: HTMLImageElement;

  private imageObserver?: ResizeObserver;

  protected createRenderRoot() {
    return this;
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    this.setupObservers();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupObservers();
  }

  private setupObservers() {
    this.cleanupObservers();

    if (this.imageElement) {
      this.imageObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this.imageSize = {
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          };
        }
      });
      this.imageObserver.observe(this.imageElement);
    }
  }

  private cleanupObservers() {
    this.imageObserver?.disconnect();
  }

  private getCardClasses() {
    const classes = ["strata-card", `strata-card--size-${this.size}`];
    if (this.bordered) classes.push("strata-card--bordered");
    return classes.join(" ");
  }

  private getFlexClass() {
    if (this.media_align === "left" && this.density !== "normal") return "strata-card__container--row";
    if (this.media_align === "left" && this.density === "normal") return "strata-card__container--responsive-row";
    if (this.media_align === "right" && this.density !== "normal") return "strata-card__container--row-reverse";
    if (this.media_align === "right" && this.density === "normal") return "strata-card__container--responsive-row-reverse";
    if (this.media_align === "top") return "strata-card__container--column";
    return "strata-card__container--column-reverse";
  }

  private getFigureClass() {
    const isHorizontal = this.media_align === "left" || this.media_align === "right";
    const isNormalDensity = this.density === "normal";
    if (!isHorizontal || (isHorizontal && isNormalDensity)) return "strata-card__figure--flexible";
    switch (this.media_width) {
      case "is-one-fifth": return "strata-card__figure--one-fifth";
      case "is-one-quarter": return "strata-card__figure--one-quarter";
      case "is-one-third": return "strata-card__figure--one-third";
      case "is-two-fifths": return "strata-card__figure--two-fifths";
      default: return "strata-card__figure--one-half";
    }
  }

  private getImageClasses() {
    const sizeClass = this.imageSize.width < 240
      ? "strata-card__image--compact"
      : this.imageSize.width <= 440
        ? "strata-card__image--standard"
        : "strata-card__image--large";
    const aspectClass = this.aspect_ratio === "square"
      ? "strata-card__image--square"
      : this.aspect_ratio === "video"
        ? "strata-card__image--video"
        : "strata-card__image--four-three";
    return `strata-card__image ${sizeClass} ${aspectClass}`;
  }

  render() {
    return html`
      <div class="${this.getCardClasses()}">
        <div class="strata-card__container ${this.getFlexClass()}">
          ${this.feature_image
            ? html`
                <figure class="strata-card__figure ${this.getFigureClass()}">
                  <a href="${this.url}">
                    <img
                      src="${this.feature_image}"
                      alt="${this.title}"
                      class="${this.getImageClasses()}"
                    />
                  </a>
                </figure>
              `
            : ""}

          <div class="strata-card__content">
            ${this.author_name
              ? html`
                  <div class="strata-card__author">
                    ${this.author_profile_image
                      ? html`
                          <img
                            src="${this.author_profile_image}"
                            alt="${this.author_name}"
                            class="strata-card__author-image"
                          />
                        `
                      : html`<span class="strata-card__author-bullet"></span>`}
                    <a href="${this.author_url}" class="strata-card__author-link">
                      ${this.author_name}
                    </a>
                  </div>
                `
              : ""}

            <a href="${this.url}" class="strata-card__title-link">
              ${this.renderTitle()}
            </a>

            ${this.density === "normal"
              ? html`<p class="strata-card__excerpt">${this.excerpt}</p>`
              : ""}
            ${this.tag_name && this.density !== "minimal"
              ? html`
                  <div class="strata-card__meta">
                    <span class="strata-card__meta-item">${this.published_at}</span>
                    <span class="strata-card__meta-item">${this.reading_time}</span>
                    <a href="${this.tag_url}" class="strata-card__tag">
                      ${this.tag_name}
                    </a>
                  </div>
                `
              : ""}
          </div>
        </div>
      </div>
    `;
  }
}
