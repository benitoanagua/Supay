import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import mainCSS from "../main.css?inline";
import type {
  OverlayAlign,
  OverlayPosition,
  OverlayFill,
  OverlayBox,
} from "../types/overlay.js";
import type { CardHeading, CardAspectRatio } from "../types/card.js";
import { TitleRendererMixin } from "../mixins/TitleRenderer.js";

// Aplicar el mixin a la clase base
const BaseClass = TitleRendererMixin(LitElement);

@customElement("wc-overlay")
export class WcOverlay extends BaseClass {
  static styles = [unsafeCSS(mainCSS)];

  @property({ type: String }) title = "";
  @property({ type: String }) url = "";
  @property({ type: String, attribute: "feature-image" }) feature_image = "";
  @property({ type: String, attribute: "tag-name" }) tag_name = "";
  @property({ type: String, attribute: "author-name" }) author_name = "";
  @property({ type: String, attribute: "published-at" }) published_at = "";
  @property({ type: String, attribute: "reading-time" }) reading_time = "";
  @property({ type: String, attribute: "aspect-ratio" })
  aspect_ratio: CardAspectRatio = "monitor";
  @property({ type: Number, reflect: true }) heading: CardHeading = 4;
  @property({ type: Boolean, attribute: "show-meta" }) show_meta = false;
  @property({ type: Boolean, attribute: "show-category" }) show_category =
    false;
  @property({ type: String }) align: OverlayAlign = "center";
  @property({ type: String }) position: OverlayPosition = "center";
  @property({ type: String }) box: OverlayBox = "background";
  @property({ type: String }) fill: OverlayFill = "full";

  protected createRenderRoot() {
    return this;
  }

  private getAspectRatioClass() {
    return this.aspect_ratio === "square"
      ? "aspect-square"
      : this.aspect_ratio === "video"
        ? "aspect-video"
        : "aspect-4/3";
  }

  private getAlignClass() {
    return this.align === "start"
      ? "justify-start"
      : this.align === "end"
        ? "justify-end"
        : "justify-center";
  }

  private getPositionClass() {
    return this.position === "top"
      ? "items-start"
      : this.position === "bottom"
        ? "items-end"
        : "items-center";
  }

  private getOverlayClasses() {
    const classes = [
      "w-full flex overflow-hidden bg-cover bg-center",
      this.getPositionClass(),
      this.getAlignClass(),
      this.getAspectRatioClass(),
    ];

    if (this.fill !== "none") {
      classes.push(
        "relative before:content-[''] before:absolute before:w-full before:h-full"
      );
    }

    if (this.fill === "full") {
      classes.push("before:bg-black/50");
    } else if (this.fill === "gradient") {
      if (this.position === "top") {
        classes.push("before:bg-gradient-to-b before:from-black/90");
      } else if (this.position === "bottom") {
        classes.push("before:bg-gradient-to-t before:from-black/90");
      } else {
        classes.push(
          "before:bg-gradient-to-t before:from-transparent before:via-black/90 before:to-transparent"
        );
      }
    }

    return classes.join(" ");
  }

  private getContentClasses() {
    const classes = [
      "max-w-xl p-4 flex flex-col space-y-1 text-left",
      this.fill !== "none" ? "z-10" : "",
    ];

    if (this.box === "background") {
      classes.push("bg-primary/90");
    } else if (this.box === "border") {
      classes.push("m-4 border border-white/20");
    } else {
      classes.push("bg-transparent");
    }

    return classes.join(" ");
  }

  render() {
    return html`
      <div
        class="${this.getOverlayClasses()}"
        style="background-image: url(${this.feature_image})"
      >
        <div class="${this.getContentClasses()}">
          ${this.show_category && this.tag_name
            ? html`
                <span
                  class="font-sans font-500 text-xs text-accent-500 uppercase"
                >
                  ${this.tag_name}
                </span>
              `
            : ""}

          <a href="${this.url}"> ${this.renderTitle("text-white")} </a>

          ${this.show_meta
            ? html`
                <ul class="flex flex-wrap">
                  ${this.author_name
                    ? html`
                        <li
                          class="flex items-center font-sans font-500 text-xs uppercase text-neutral-300
                                   after:content-[''] after:mx-1.5 after:w-[1px] after:h-3 after:last-hidden after:-skew-x-12 after:bg-primary-500"
                        >
                          ${this.author_name}
                        </li>
                      `
                    : ""}
                  ${this.published_at
                    ? html`
                        <li
                          class="flex items-center font-sans font-500 text-xs text-neutral-400
                                   after:content-[''] after:mx-1.5 after:w-[1px] after:h-3 after:last-hidden after:-skew-x-12 after:bg-primary-500"
                        >
                          ${this.published_at}
                        </li>
                      `
                    : ""}
                  ${this.reading_time
                    ? html`
                        <li
                          class="flex items-center font-sans font-500 text-xs text-neutral-400"
                        >
                          ${this.reading_time}
                        </li>
                      `
                    : ""}
                </ul>
              `
            : ""}
        </div>
      </div>
    `;
  }
}
