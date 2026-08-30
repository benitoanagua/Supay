import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";
const meta: Meta = {
  title: "Components/NumberField",
  component: "strata-number-field",
};
export default meta;
export const Default: StoryObj = {
  render: () => html`<strata-number-field></strata-number-field>`,
};
