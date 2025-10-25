import type { Meta, StoryObj } from "@storybook/html";

const meta = {
  title: "Components/ThemeToggle",
  component: "wc-theme-toggle",
  tags: ["autodocs"],
  render: () => {
    return document.createElement("wc-theme-toggle");
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Structural: Story = {};

export const InContext: Story = {
  render: () => {
    const container = document.createElement("div");
    container.className =
      "flex items-center justify-between p-4 bg-surfaceContainerHigh border border-outlineVariant rounded-lg";

    container.innerHTML = `
      <div class="text-onSurface font-medium">Theme Control</div>
      <wc-theme-toggle></wc-theme-toggle>
    `;

    return container;
  },
};

export const Playground: Story = {
  parameters: {
    controls: { expanded: true },
  },
};
