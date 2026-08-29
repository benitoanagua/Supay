import type { Meta, StoryObj } from '@storybook/html';
import '@strata/components';

const meta: Meta = { title: 'Foundations/Spectrum' };
export default meta;
type Story = StoryObj;
const colors = [
  ['red','error'],['orange','warning'],['yellow','caution'],['green','success'],['blue','info'],['indigo','context'],['violet','special'],
];
export const Semantic: Story = { render: () => `<section style="font-family:var(--strata-font-sans);max-width:900px"><h1>Monochrome establishes structure.</h1><p>Color establishes meaning. The spectrum is deliberately restrained.</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px">${colors.map(([tone,meaning])=>`<div style="display:grid;gap:8px"><strata-badge tone="${tone}">${tone}</strata-badge><small style="font-family:var(--strata-font-mono)">${meaning}</small></div>`).join('')}</div></section>` };
