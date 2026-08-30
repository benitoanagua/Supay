import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = {
  title: "Components/Overview",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

export const Catalog: Story = {
  render: () => html`
<main class="strata-story-catalog-page">
<header class="strata-story-catalog-header"><p class="strata-story-catalog-kicker">STRATA / Components</p><h1 class="strata-story-catalog-title">Components are consequences of the foundations.</h1><p class="strata-story-catalog-lead">Each component inherits scale, typography, color, state and accessibility contracts.</p></header>
<section class="strata-story-section">
<div><h2>Actions</h2><div class="strata-story-actions-demo"><strata-button label="Primary" icon="carbon:add"></strata-button><strata-button label="Outlined" variant="outlined"></strata-button><strata-button label="Text" variant="text"></strata-button><strata-icon-button label="Settings"><iconify-icon icon="carbon:settings"></iconify-icon></strata-icon-button></div></div>
<strata-divider variant="double"></strata-divider>
<div><h2>Forms</h2><div class="strata-story-form-demo"><strata-text-field label="Name" placeholder="Your name"></strata-text-field><strata-select label="Category"><option>Editorial</option><option>Product</option></strata-select><strata-checkbox label="Accept"></strata-checkbox><strata-switch label="Enabled"></strata-switch></div></div>
<strata-divider></strata-divider>
<div><h2>Feedback</h2><div class="strata-story-feedback-demo"><strata-alert tone="info">Information is communicated without changing the structural scale.</strata-alert><strata-alert tone="success">Confirmed.</strata-alert><div><strata-badge tone="violet">Special</strata-badge></div><strata-progress value="64"></strata-progress><strata-skeleton></strata-skeleton></div></div>
<strata-divider></strata-divider>
<div><h2>Editorial surface</h2><strata-card size="large"><h3>Large surfaces carry more structural weight.</h3><p>Typography and dividers can establish hierarchy without enclosing every block.</p><strata-divider variant="dashed"></strata-divider><p class="strata-story-numeric">2026-08-29 · 14:32 · 98.4%</p></strata-card></div>
</section></main>`,
};
