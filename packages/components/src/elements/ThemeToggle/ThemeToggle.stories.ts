import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";
const meta = { title: "Components/ThemeToggle", component: "strata-theme-toggle", tags: ["autodocs"] } satisfies Meta;
export default meta; type Story = StoryObj;
export const Structural: Story = { render: () => html`<strata-theme-toggle></strata-theme-toggle>` };
export const InContext: Story = { render: () => html`<div class="strata-story-theme-context"><div class="strata-story-theme-control">Theme Control</div><strata-theme-toggle></strata-theme-toggle></div>` };
export const Playground: Story = { parameters: { controls: { expanded: true } } };
