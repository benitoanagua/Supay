import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";
const meta: Meta = {
  title: "Components/DateField",
  component: "strata-date-field",
};
export default meta;
export const Default: StoryObj = {
  render: () => html`<strata-date-field></strata-date-field>`,
};
