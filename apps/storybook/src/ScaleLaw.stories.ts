import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";

const meta: Meta = {
  title: "Foundations/Scale Law",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

const sizes = ["micro", "small", "medium", "large", "hero"];
export const StructuralWeight: Story = {
  render: () => `
    <main class="strata-story-scale-page">
      <header style="max-width:680px;margin-bottom:32px">
        <p class="strata-story-scale-kicker">Foundation / Geometry</p>
        <h1 style="font-size:40px;line-height:1.05;margin:8px 0">Physical scale determines structural weight.</h1>
        <p style="font-size:18px;line-height:1.5">As physical size increases, radius, border and elevation increase with it. Importance never overrides geometry.</p>
      </header>
      <div class="strata-story-scale-grid">
        ${sizes.map((size) => `<strata-surface size="${size}"><strong style="display:block;font-size:${size === "hero" ? 28 : size === "large" ? 22 : size === "medium" ? 18 : 14}px">${size}</strong><span style="font:400 11px var(--strata-font-mono)">radius / border / depth</span></strata-surface>`).join("")}
      </div>
    </main>`,
};
