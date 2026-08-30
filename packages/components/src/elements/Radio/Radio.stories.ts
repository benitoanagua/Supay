import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Components/Radio", component: "strata-radio" };
export default meta;

export const Default: StoryObj = {
  render: () => html`<strata-radio label="Option" value="option"></strata-radio>`,
};
