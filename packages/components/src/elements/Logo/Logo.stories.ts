import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const meta: Meta = { title: "Components/Logo", component: "strata-logo", tags: ["autodocs"] };
export default meta;
type Story = StoryObj;

export const Structural: Story = { render: () => html`<strata-logo></strata-logo>` };
export const Playground: Story = { render: () => html`<strata-logo></strata-logo>`, parameters: { controls: { expanded: true } } };
