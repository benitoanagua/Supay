import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = { title: "Introduction/STRATA Design System", tags: ["autodocs"] };
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => html`
    <article class="strata-story-foundation-page">
      <h1>STRATA</h1>
      <p class="strata-story-lead">Contemporary editorial design system rooted in monochrome structure, proportional geometry, and restrained semantic color.</p>
      <strata-divider></strata-divider>
      <p><strong>Monochrome establishes structure.</strong><br />Color establishes meaning.</p>
    </article>
  `,
};
