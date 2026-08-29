import type { Meta, StoryObj } from '@storybook/html';
import '@strata/components';

const meta: Meta = { title: 'Foundations/Overview' };
export default meta;
type Story = StoryObj;

export const ScaleLaw: Story = {
  render: () => `
    <section class="strata-story-foundation-page">
      <h1>STRATA Scale Law</h1>
      <p>Physical scale determines structural weight.</p>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;align-items:end">
        ${['micro','small','medium','large','hero'].map((size) => `<strata-surface size="${size}"><strong>${size}</strong><br><small>radius · border · elevation</small></strata-surface>`).join('')}
      </div>
    </section>`,
};

export const Spectrum: Story = {
  render: () => `
    <section class="strata-story-foundation-page">
      <h1>STRATA Spectrum</h1>
      <p>Monochrome establishes structure. Color establishes meaning.</p>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:8px">
        ${['red','orange','yellow','green','blue','indigo','violet'].map((tone) => `<strata-badge tone="${tone}">${tone}</strata-badge>`).join('')}
      </div>
    </section>`,
};

export const Typography: Story = {
  render: () => `
    <article class="strata-story-foundation-page">
      <h1 style="font-size:48px;line-height:1.05">Editorial hierarchy</h1>
      <h2 style="font-size:24px">Source Sans 3 carries the interface.</h2>
      <p style="font-size:16px;line-height:1.5">Short lines, strong hierarchy and compact mobile reading are part of the system.</p>
      <p class="strata-story-numeric strata-story-numeric--large">$12,840.50 · 14:32 · 98.4%</p>
    </article>`,
};

export const Dividers: Story = {
  render: () => `<section class="strata-story-foundation-page"><h2>Editorial dividers</h2><p>Structural separation</p><strata-divider></strata-divider><p>Major section</p><strata-divider variant="double"></strata-divider><p>Secondary relationship</p><strata-divider variant="dashed"></strata-divider></section>`,
};
