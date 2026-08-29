import type { Preview } from "@storybook/html";

// Importa tus estilos y custom elements
import "../dist/supay-elements.css";
import "../dist/supay-elements.es.js";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            reviewOnFail: true,
          },
        ],
      },
    },
    options: {
      storySort: {
        order: ["Intro", "Components", "*"],
      },
    },
  },
};

export default preview;
