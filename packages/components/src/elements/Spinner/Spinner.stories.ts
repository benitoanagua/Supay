import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";
const meta: Meta = { title: "Components/Spinner", component: "strata-spinner" };
export default meta;
export const Default: StoryObj = {
  render: () => html`<strata-spinner></strata-spinner>`,
};
