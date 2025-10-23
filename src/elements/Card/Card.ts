import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type {
  CardHeading,
  CardDensity,
  CardMediaAlign,
  CardMediaWidth,
  CardAspectRatio,
  CardElevation,
} from "../../types/card.js";
import { TitleRendererMixin } from "../../mixins/TitleRenderer.js";

const BaseClass = TitleRendererMixin(LitElement);

@customElement("wc-card")
export class WcCard extends BaseClass {
  static styles = [unsafeCSS(mainCSS)];

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
  @property({ type: String, attribute: "aspect-ratio" })
  aspect_ratio: CardAspectRatio = "monitor";
  @property({ type: String, attribute: "reading-time" }) reading_time = "";
  @property({ type: String, attribute: "published-at" }) published_at = "";
  @property({ type: Number }) elevation: CardElevation = 2;

  @query("img") private imageElement?: HTMLImageElement;

  protected createRenderRoot() {
    return this;
  }

  private getCardClasses() {
    const classes = [
      "metro-card",
      `metro-card--elevation-${this.elevation}`,
      `metro-card--density-${this.density}`,
    ];
    return classes.join(" ");
  }

  private getFlexClass() {
    if (this.media_align === "top") return "flex-col";
    if (this.media_align === "bottom") return "flex-col-reverse";

    // Mobile: siempre columna
    if (this.media_align === "left") return "flex-col md:flex-row";
    if (this.media_align === "right")
      return "flex-col-reverse md:flex-row-reverse";

    return "flex-col";
  }

  private getFigureClass() {
    const isHorizontal =
      this.media_align === "left" || this.media_align === "right";

    if (!isHorizontal) return "w-full";

    // Mobile: ancho completo, desktop: ancho proporcional
    switch (this.media_width) {
      case "is-one-fifth":
        return "w-full md:w-1/5";
      case "is-one-quarter":
        return "w-full md:w-1/4";
      case "is-one-third":
        return "w-full md:w-1/3";
      case "is-two-fifths":
        return "w-full md:w-2/5";
      default:
        return "w-full md:w-1/2";
    }
  }

  private getImageClasses() {
    const aspectClass =
      this.aspect_ratio === "square"
        ? "aspect-square"
        : this.aspect_ratio === "video"
          ? "aspect-video"
          : "aspect-4/3";

    return `w-full object-cover ${aspectClass}`;
  }

  render() {
    return html`
      <div class="${this.getCardClasses()}">
        <div class="metro-card__container ${this.getFlexClass()}">
          ${this.feature_image
            ? html`
                <figure class="metro-card__figure ${this.getFigureClass()}">
                  <a href="${this.url}" class="block">
                    <img
                      src="${this.feature_image}"
                      alt="${this.title}"
                      class="${this.getImageClasses()}"
                      @load="${this.onImageLoad}"
                    />
                  </a>
                </figure>
              `
            : ""}

          <div class="metro-card__content">
            ${this.author_name
              ? html`
                  <div class="metro-card__author">
                    ${this.author_profile_image
                      ? html`
                          <img
                            src="${this.author_profile_image}"
                            alt="${this.author_name}"
                            class="metro-card__author-image"
                          />
                        `
                      : html`<span class="metro-card__author-bullet"></span>`}
                    <a
                      href="${this.author_url}"
                      class="metro-card__author-link"
                    >
                      ${this.author_name}
                    </a>
                  </div>
                `
              : ""}

            <a href="${this.url}" class="metro-card__title-link">
              ${this.renderTitle()}
            </a>

            ${this.density === "normal"
              ? html`<p class="metro-card__excerpt">${this.excerpt}</p>`
              : ""}
            ${this.tag_name && this.density !== "minimal"
              ? html`
                  <div class="metro-card__meta">
                    <span class="metro-card__meta-item"
                      >${this.published_at}</span
                    >
                    <span class="metro-card__meta-item"
                      >${this.reading_time}</span
                    >
                    <a href="${this.tag_url}" class="metro-card__tag">
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

  private onImageLoad() {
    if (this.imageElement) {
      this.imageSize = {
        width: this.imageElement.clientWidth,
        height: this.imageElement.clientHeight,
      };
    }
  }
}
