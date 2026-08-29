import type { Meta, StoryObj } from '@storybook/html';
import '@strata/components';
import 'iconify-icon';

const meta: Meta = {
  title: 'Components/Catalog — Complete',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const section = (title: string, content: string) => `
  <section class="strata-catalog-section">
    <h2 class="strata-catalog-heading">${title}</h2>
    ${content}
  </section>`;

export const AllComponents: Story = {
  render: () => `
    <main class="strata-catalog">
      <header class="strata-catalog-header">
        <p class="strata-kicker">STRATA / Component catalog</p>
        <h1>Components under one visual contract.</h1>
        <p>Monochrome structure, editorial typography, proportional geometry and restrained semantic color.</p>
      </header>
      ${section('Actions', `
        <div class="strata-row">
          <strata-button label="Primary" icon="carbon:add"></strata-button>
          <strata-button label="Outlined" variant="outlined"></strata-button>
          <strata-button label="Text" variant="text"></strata-button>
          <strata-button label="Large" size="large"></strata-button>
          <strata-icon-button label="Settings"><iconify-icon icon="carbon:settings" aria-hidden="true"></iconify-icon></strata-icon-button>
        </div>`)}
      ${section('Forms', `
        <div class="strata-form-grid">
          <strata-text-field label="Name" placeholder="Your name"></strata-text-field>
          <strata-select label="Category"><option>Editorial</option><option>Product</option></strata-select>
          <strata-checkbox label="Accept"></strata-checkbox>
          <strata-switch label="Enabled"></strata-switch>
        </div>`)}
      ${section('Navigation', `
        <nav class="strata-row" aria-label="Example navigation">
          <strata-nav-item label="Overview" selected></strata-nav-item>
          <strata-nav-item label="Archive"></strata-nav-item>
          <strata-nav-item label="Settings"></strata-nav-item>
        </nav>
        <div style="margin-top:16px"><strata-tabs></strata-tabs></div>`)}
      ${section('Feedback', `
        <div class="strata-stack">
          <strata-alert tone="info">Information is communicated without changing structural scale.</strata-alert>
          <strata-alert tone="warning">Review this before continuing.</strata-alert>
          <div class="strata-row"><strata-badge tone="green">Confirmed</strata-badge><strata-badge tone="violet">Special</strata-badge><strata-badge tone="orange">Attention</strata-badge></div>
          <strata-progress value="64"></strata-progress>
          <strata-skeleton></strata-skeleton>
        </div>`)}
      ${section('Surfaces & editorial', `
        <div class="strata-surface-grid">
          <strata-surface size="small"><strong>Small</strong><p>Minimal structural weight.</p></strata-surface>
          <strata-surface size="medium"><strong>Medium</strong><p>Balanced surface.</p></strata-surface>
          <strata-surface size="large"><strong>Large</strong><p>More depth and geometry.</p></strata-surface>
        </div>
        <div class="strata-editorial" style="margin-top:24px">
          <h3>Editorial content does not need a box.</h3>
          <strata-divider></strata-divider>
          <p>Typography and rules can create hierarchy while preserving the monochromatic field.</p>
          <strata-divider variant="double"></strata-divider>
          <p class="strata-mono">2026-08-29 · 14:32 · 98.4%</p>
          <strata-divider variant="dashed"></strata-divider>
        </div>`)}
      ${section('Data', `
        <strata-data-table>
          <thead><tr><th>Publication</th><th>Status</th><th>Score</th></tr></thead>
          <tbody><tr><td>Morning Edition</td><td>Published</td><td>98.4</td></tr><tr><td>Weekend Review</td><td>Draft</td><td>87.2</td></tr></tbody>
        </strata-data-table>
        <div class="strata-row" style="margin-top:16px"><strata-pagination page="2" pages="5"></strata-pagination></div>`)}
      ${section('Overlay & composition', `
        <div class="strata-row"><strata-button label="Open dialog"></strata-button><strata-theme-toggle></strata-theme-toggle></div>
      `)}
    </main>`,
};

export const States: Story = {
  render: () => `
    <main class="strata-catalog">
      <header class="strata-catalog-header"><p class="strata-kicker">STRATA / States</p><h1>Interaction states remain restrained.</h1></header>
      ${section('Buttons', `<div class="strata-row"><strata-button label="Default"></strata-button><strata-button label="Loading" loading></strata-button><strata-button label="Disabled" disabled></strata-button></div>`)}
      ${section('Navigation', `<div class="strata-row"><strata-nav-item label="Selected" selected></strata-nav-item><strata-nav-item label="Unselected"></strata-nav-item></div>`)}
      ${section('Spectrum', `<div class="strata-spectrum-row">${['red','orange','yellow','green','blue','indigo','violet'].map(t=>`<strata-badge tone="${t}">${t}</strata-badge>`).join('')}</div>`)}
    </main>`,
};
