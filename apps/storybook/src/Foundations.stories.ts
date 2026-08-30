import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Foundations/Overview" };
export default meta;
type Story = StoryObj;

export const ScaleLaw: Story = {
  render: () => html`
    <section class="strata-story-foundation-page">
      <h1>STRATA Scale Law</h1>
      <p>Physical scale determines structural weight.</p>
      <div class="strata-story-scale-grid">
        ${["micro", "small", "medium", "large", "hero"].map((size) => html`
          <strata-surface size=${size}><strong>${size}</strong><br /><small>radius · border · elevation</small></strata-surface>
        `)}
      </div>
    </section>
  `,
};

export const Spectrum: Story = {
  render: () => html`
    <section class="strata-story-foundation-page">
      <h1>STRATA Spectrum</h1>
      <p>Monochrome establishes structure. Color establishes meaning.</p>
      <div class="strata-story-spectrum-grid">
        ${["red", "orange", "yellow", "green", "blue", "indigo", "violet"].map((tone) => html`<strata-badge tone=${tone}>${tone}</strata-badge>`)}
      </div>
    </section>
  `,
};

export const Typography: Story = {
  render: () => html`
    <article class="strata-story-foundation-page">
      <h1>Editorial hierarchy</h1>
      <h2>Source Sans 3 carries the interface.</h2>
      <p>Short lines, strong hierarchy and compact mobile reading are part of the system.</p>
      <p class="strata-story-numeric strata-story-numeric--large">$12,840.50 · 14:32 · 98.4%</p>
    </article>
  `,
};

export const Dividers: Story = {
  render: () => html`
    <section class="strata-story-foundation-page">
      <h2>Editorial dividers</h2>
      <p>Structural separation</p>
      <strata-divider></strata-divider>
      <p>Major section</p>
      <strata-divider variant="double"></strata-divider>
      <p>Secondary relationship</p>
      <strata-divider variant="dashed"></strata-divider>
    </section>
  `,
};
