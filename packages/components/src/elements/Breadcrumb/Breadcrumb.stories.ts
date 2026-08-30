import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Components/Breadcrumb", component: "strata-breadcrumb" };
export default meta;

export const Default: StoryObj = {
  render: () => html`<strata-breadcrumb items="Home|Components|Current"></strata-breadcrumb>`,
};
