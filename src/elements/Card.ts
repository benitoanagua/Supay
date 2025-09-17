import { LitElement, html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import mainCSS from "../main.css?inline";

@customElement("wc-card")
export class WcCard extends LitElement {
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
  @property({ type: String, attribute: "media-align" }) media_align = "left";
  @property({ type: String, attribute: "media-width" }) media_width = "is-half";
  @property({ type: Number, reflect: true }) heading = 1;
  @property({ type: String }) density = "normal";
  @property({ type: String, attribute: "aspect-ratio" }) aspect_ratio =
    "monitor";
  @property({ type: String, attribute: "reading-time" }) reading_time = "";
  @property({ type: String, attribute: "published-at" }) published_at = "";

  @state() private metaSize = { width: 0, height: 0 };
  @state() private imageSize = { width: 0, height: 0 };

  @query(".post-meta") private metaElement?: HTMLElement;
  @query("img") private imageElement?: HTMLImageElement;

  private metaObserver?: ResizeObserver;
  private imageObserver?: ResizeObserver;

  // ¡Clave! Deshabilitar Shadow DOM para usar estilos globales
  protected createRenderRoot() {
    return this;
  }

  protected updated(changedProperties: PropertyValueMap<any>) {
    super.updated(changedProperties);
    this.setupObservers();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.cleanupObservers();
  }

  private setupObservers() {
    this.cleanupObservers();

    if (this.metaElement) {
      this.metaObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this.metaSize = {
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          };
        }
      });
      this.metaObserver.observe(this.metaElement);
    }

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
    this.metaObserver?.disconnect();
    this.imageObserver?.disconnect();
  }

  private getFlexClass() {
    if (this.media_align === "left" && this.density !== "normal")
      return "flex-row";
    if (this.media_align === "left" && this.density === "normal")
      return "flex-col md:flex-row";
    if (this.media_align === "right" && this.density !== "normal")
      return "flex-row-reverse";
    if (this.media_align === "right" && this.density === "normal")
      return "flex-col-reverse md:flex-row-reverse";
    if (this.media_align === "top") return "flex-col";
    return "flex-col-reverse";
  }

  private getFigureClass() {
    const isHorizontal =
      this.media_align === "left" || this.media_align === "right";
    const isNormalDensity = this.density === "normal";

    if (!isHorizontal || (isHorizontal && isNormalDensity)) return "flex-1";

    switch (this.media_width) {
      case "is-one-fifth":
        return "w-1/5";
      case "is-one-quarter":
        return "w-1/4";
      case "is-one-third":
        return "w-1/3";
      case "is-two-fifths":
        return "w-2/5";
      default:
        return "w-1/2";
    }
  }

  private getImageClasses() {
    const sizeClass =
      this.imageSize.width < 240
        ? "rounded"
        : this.imageSize.width >= 240 && this.imageSize.width <= 440
          ? "rounded-md"
          : "rounded-lg";

    const aspectClass =
      this.aspect_ratio === "square"
        ? "aspect-square"
        : this.aspect_ratio === "video"
          ? "aspect-video"
          : "aspect-4/3";

    return `w-full object-cover ${sizeClass} ${aspectClass}`;
  }

  private getHeadingClass() {
    return `m-0 font-500 headline-${this.heading}`;
  }

  render() {
    return html`
      <div class="flex gap-4 ${this.getFlexClass()}">
        ${this.feature_image
          ? html`
              <figure
                class="m-0 line-height-0 overflow-hidden ${this.getFigureClass()}"
              >
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

        <div class="flex-1 flex flex-col gap-y-2">
          ${this.author_name
            ? html`
                <div
                  class="flex items-center ${this.author_profile_image
                    ? "gap-x-2"
                    : ""}"
                >
                  ${this.author_profile_image
                    ? html`
                        <img
                          src="${this.author_profile_image}"
                          alt="${this.author_name}"
                          class="w-8 h-8 rounded-full"
                        />
                      `
                    : html` <span class="author-bullet"></span> `}
                  <a href="${this.author_url}" class="author-link">
                    ${this.author_name}
                  </a>
                </div>
              `
            : ""}

          <a href="${this.url}" class="text-neutral-900 no-underline font-sans">
            <h3 class="${this.getHeadingClass()}">${this.title}</h3>
          </a>

          ${this.density === "normal"
            ? html`
                <p class="my-2 font-serif text-base text-neutral-700">
                  ${this.excerpt}
                </p>
              `
            : ""}
          ${this.tag_name && this.density !== "minimal"
            ? html`
                <div class="post-meta">
                  <span
                    class="capitalize after:content-['•'] after:ml-2 after:mr-1"
                  >
                    ${this.published_at}
                  </span>
                  <span
                    class="${this.metaSize.width > 240
                      ? `after:content-['•'] after:ml-2 after:mr-1`
                      : ""}"
                  >
                    ${this.reading_time}
                  </span>
                  ${this.metaSize.width > 240
                    ? html`
                        <a
                          href="${this.tag_url}"
                          class="text-neutral-900 no-underline bg-neutral-100 py-.5 px-3 rounded-full"
                        >
                          ${this.tag_name}
                        </a>
                      `
                    : ""}
                </div>
              `
            : ""}
        </div>
      </div>
    `;
  }
}
