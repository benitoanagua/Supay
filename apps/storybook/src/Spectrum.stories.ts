import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";

const meta: Meta = { title: "Foundations/Spectrum" };
export default meta;
type Story = StoryObj;
const colors = [
  ["red", "error"],
  ["orange", "warning"],
  ["yellow", "caution"],
  ["green", "success"],
  ["blue", "info"],
  ["indigo", "context"],
  ["violet", "special"],
];
export const Semantic: Story = {
  render: () =>
    `<section class="strata-story-foundation-page"><h1>Monochrome establishes structure.</h1><p>Color establishes meaning. The spectrum is deliberately restrained.</p><div class="strata-story-spectrum-grid">${colors.map(([tone, meaning]) => `<div class="strata-story-spectrum-item"><strata-badge tone="${tone}">${tone}</strata-badge><small class="strata-story-scale-label">${meaning}</small></div>`).join("")}</div></section>`,
};
