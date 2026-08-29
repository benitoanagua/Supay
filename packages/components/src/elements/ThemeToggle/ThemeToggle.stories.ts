import type { Meta, StoryObj } from "@storybook/html";

const meta = {
  title: "Components/ThemeToggle",
  component: "strata-theme-toggle",
  tags: ["autodocs"],
  render: () => {
    return document.createElement("strata-theme-toggle");
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Structural: Story = {};

export const InContext: Story = {
  render: () => {
    const container = document.createElement("div");
    container.className = "strata-story-theme-context";

    container.innerHTML = `
      <div class="strata-story-theme-control">Theme Control</div>
      <strata-theme-toggle></strata-theme-toggle>
    `;

    return container;
  },
};

export const Playground: Story = {
  parameters: {
    controls: { expanded: true },
  },
};
