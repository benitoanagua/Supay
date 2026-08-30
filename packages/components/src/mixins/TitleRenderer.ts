import { html, LitElement, TemplateResult } from "lit";
import type { CardHeading } from "../types/card.js";

export interface TitleRendererInterface {
  heading: CardHeading;
  title: string;
  getHeadingClass(): string;
  renderTitle(additionalClasses?: string): TemplateResult;
}

type Constructor<T = object> = new (...args: any[]) => T;

export function TitleRendererMixin<T extends Constructor<LitElement>>(
  Base: T,
): Constructor<TitleRendererInterface> & T {
  class TitleRenderer extends Base implements TitleRendererInterface {
    heading!: CardHeading;
    title!: string;

    getHeadingClass(): string {
      return `strata-title strata-title--level-${this.heading}`;
    }

    renderTitle(additionalClasses: string = ""): TemplateResult {
      const titleClass = this.getHeadingClass();
      const fullClass = additionalClasses
        ? `${titleClass} ${additionalClasses}`
        : titleClass;

      switch (this.heading) {
        case 1:
          return html`<h1 class="${fullClass}">${this.title}</h1>`;
        case 2:
          return html`<h2 class="${fullClass}">${this.title}</h2>`;
        case 3:
          return html`<h3 class="${fullClass}">${this.title}</h3>`;
        case 4:
          return html`<h4 class="${fullClass}">${this.title}</h4>`;
        case 5:
          return html`<h5 class="${fullClass}">${this.title}</h5>`;
        case 6:
          return html`<h6 class="${fullClass}">${this.title}</h6>`;
        default:
          return html`<h2 class="${fullClass}">${this.title}</h2>`;
      }
    }
  }

  return TitleRenderer;
}
