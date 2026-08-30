import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = {
  title: "Components/MenuItem",
  component: "strata-menu-item",
};
export default meta;

export const Default: StoryObj = {
  render: () => html`
    <strata-menu>
      <strata-menu-item label="Item"></strata-menu-item>
      <strata-menu-item label="Another item"></strata-menu-item>
    </strata-menu>
  `,
};
