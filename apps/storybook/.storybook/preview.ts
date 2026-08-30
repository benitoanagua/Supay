import "../src/story-components.css";
import "@strata/tokens/styles.css";
import "@strata/components";
import type { Preview } from "@storybook/html";
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
    (story) => {
      const rendered = story();
      const frame = document.createElement("div");
      frame.dataset.theme = "light";
      frame.className = "strata-story-frame";

      if (typeof rendered === "string") {
        frame.innerHTML = rendered;
      } else if (rendered instanceof Node) {
        frame.appendChild(rendered);
      } else if (rendered != null) {
        frame.appendChild(document.createTextNode(String(rendered)));
      }

      return frame;
    },
  ],
  tags: ["autodocs"],
};

export default preview;
