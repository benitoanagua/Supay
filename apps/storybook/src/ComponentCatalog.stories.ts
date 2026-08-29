import type { Meta, StoryObj } from '@storybook/html';
import '@strata/components';

const meta: Meta = { title: 'Components/Overview', parameters: { layout: 'fullscreen' } };
export default meta;
type Story = StoryObj;

export const Catalog: Story = { render: () => `
<main style="font-family:var(--strata-font-sans);padding:32px;max-width:1100px;margin:auto">
<header style="max-width:700px;margin-bottom:40px"><p style="font:500 12px var(--strata-font-mono);letter-spacing:.08em;text-transform:uppercase">STRATA / Components</p><h1 style="font-size:42px;line-height:1.05;margin:8px 0">Components are consequences of the foundations.</h1><p style="font-size:18px;line-height:1.5">Each component inherits scale, typography, color, state and accessibility contracts.</p></header>
<section style="display:grid;gap:32px">
<div><h2>Actions</h2><div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center"><strata-button label="Primary" icon="carbon:add"></strata-button><strata-button label="Outlined" variant="outlined"></strata-button><strata-button label="Text" variant="text"></strata-button><strata-icon-button label="Settings"><iconify-icon icon="carbon:settings"></iconify-icon></strata-icon-button></div></div>
<strata-divider variant="double"></strata-divider>
<div><h2>Forms</h2><div style="display:grid;gap:12px;max-width:520px"><strata-text-field label="Name" placeholder="Your name"></strata-text-field><strata-select label="Category"><option>Editorial</option><option>Product</option></strata-select><strata-checkbox label="Accept"></strata-checkbox><strata-switch label="Enabled"></strata-switch></div></div>
<strata-divider></strata-divider>
<div><h2>Feedback</h2><div style="display:grid;gap:12px;max-width:720px"><strata-alert tone="info">Information is communicated without changing the structural scale.</strata-alert><strata-alert tone="success">Confirmed.</strata-alert><div><strata-badge tone="violet">Special</strata-badge></div><strata-progress value="64"></strata-progress><strata-skeleton></strata-skeleton></div></div>
<strata-divider></strata-divider>
<div><h2>Editorial surface</h2><strata-card size="large"><h3>Large surfaces carry more structural weight.</h3><p>Typography and dividers can establish hierarchy without enclosing every block.</p><strata-divider variant="dashed"></strata-divider><p style="font-family:var(--strata-font-mono)">2026-08-29 · 14:32 · 98.4%</p></strata-card></div>
</section></main>` };
