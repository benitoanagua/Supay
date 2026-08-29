import type { Meta, StoryObj } from '@storybook/html';
import '@strata/components';

const meta: Meta = { title: 'Foundations/Iconography' };
export default meta;
type Story = StoryObj;
const icons = ['add','close','settings','search','arrow-left','arrow-right','checkmark','warning','information','error','home','menu','edit','trash-can','download','upload'];
export const Carbon: Story = { render: () => `<section style="font-family:var(--strata-font-sans);max-width:900px"><p><strong>Only Carbon.</strong> STRATA uses <code>@iconify-json/carbon</code> through <code>iconify-icon</code> directly.</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:1px;background:var(--strata-color-border-subtle)">${icons.map(name=>`<div style="background:var(--strata-color-surface-page);padding:20px 12px;display:grid;gap:8px;justify-items:center"><iconify-icon icon="carbon:${name}" style="font-size:24px"></iconify-icon><code style="font-size:10px">carbon:${name}</code></div>`).join('')}</div></section>` };
