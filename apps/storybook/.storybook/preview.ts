import "../src/story-components.css";
import "@strata/tokens/styles.css";
import "@strata/components";
import type { Preview } from "@storybook/web-components";
import { html } from "lit";
import "./strata-preview.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    backgrounds: {
      default: "page",
      values: [
        { name: "page", value: "#ffffff" },
        { name: "ink", value: "#111111" },
      ],
    },
    a11y: { test: "error" },
    viewport: {
      viewports: {
        strataMobile: {
          name: "STRATA Mobile",
          styles: { width: "390px", height: "844px" },
        },
        strataMobileSmall: {
          name: "STRATA Small",
          styles: { width: "320px", height: "700px" },
        },
      },
    },
  },
  decorators: [
    (story) => html`
      <div data-theme="light" class="strata-story-frame">${story()}</div>
    `,
  ],
  tags: ["autodocs"],
};

export default preview;
