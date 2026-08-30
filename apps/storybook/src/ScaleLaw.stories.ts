import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Foundations/Scale Law" };
export default meta;
type Story = StoryObj;
const sizes = ["micro", "small", "medium", "large", "hero"];

export const Structural: Story = {
  render: () => html`
    <section class="strata-story-scale-page">
      <p class="strata-story-scale-kicker">Foundation</p>
      <h1>Scale Law</h1>
      <p>Radius, border and elevation increase with structural size.</p>
      <div class="strata-story-scale-grid">
        ${sizes.map((size) => html`<strata-surface size=${size}><strong>${size}</strong><span class="strata-story-scale-label">radius / border / depth</span></strata-surface>`)}
      </div>
    </section>
  `,
};
