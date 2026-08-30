import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Components/Tooltip", component: "strata-tooltip" };
export default meta;

export const Default: StoryObj = {
  render: () => html`<strata-tooltip text="Helpful information"><strata-button label="Hover me"></strata-button></strata-tooltip>`,
};
