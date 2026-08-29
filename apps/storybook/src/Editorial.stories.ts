import type { Meta, StoryObj } from '@storybook/html';
import '@strata/components';

const meta: Meta = { title: 'Editorial/Principles' };
export default meta;
type Story = StoryObj;

export const NewspaperToMagazine: Story = {
  render: () => `<article style="font-family:var(--strata-font-sans);max-width:900px;margin:auto"><header style="border-bottom:2px solid var(--strata-color-border-strong);padding-bottom:16px"><p style="font:500 11px var(--strata-font-mono);letter-spacing:.1em;text-transform:uppercase">STRATA / Editorial</p><h1 style="font-size:clamp(36px,8vw,72px);line-height:.95;letter-spacing:-.05em;margin:8px 0">Structure in monochrome.<br>Meaning in color.</h1><p style="font-size:18px;max-width:680px;line-height:1.5">Classic newspaper discipline meets contemporary magazine clarity. Typography leads; dividers organize; spectrum signals.</p></header><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;margin-top:24px"><section><h2>01 / Typography</h2><p>Source Sans 3 carries the interface. Source Code Pro handles measurements, numbers and metadata.</p></section><section><h2>02 / Structure</h2><p>Scale controls radius, border and elevation. Not every block needs a border.</p></section><section><h2>03 / Spectrum</h2><p><strata-badge tone="red">error</strata-badge> <strata-badge tone="green">success</strata-badge> <strata-badge tone="violet">special</strata-badge></p></section></div><strata-divider variant="double"></strata-divider><p style="font:400 12px var(--strata-font-mono)">EDITORIAL SYSTEM · MOBILE FIRST · STRATA</p></article>`
};
