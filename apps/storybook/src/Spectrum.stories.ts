import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Foundations/Spectrum" };
export default meta;
type Story = StoryObj;
const colors = [["red", "error"], ["orange", "attention"], ["yellow", "caution"], ["green", "success"], ["blue", "information"], ["indigo", "navigation"], ["violet", "accent"]] as const;

export const Semantic: Story = {
  render: () => html`
    <section class="strata-story-foundation-page">
      <h1>Monochrome establishes structure.</h1>
      <p>Color establishes meaning. The spectrum is deliberately restrained.</p>
      <div class="strata-story-spectrum-grid">
        ${colors.map(([tone, meaning]) => html`<div class="strata-story-spectrum-item"><strata-badge tone=${tone}>${tone}</strata-badge><small class="strata-story-scale-label">${meaning}</small></div>`)}
      </div>
    </section>
  `,
};
