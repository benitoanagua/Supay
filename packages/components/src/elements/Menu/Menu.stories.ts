import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Components/Menu", component: "strata-menu" };
export default meta;

export const Default: StoryObj = {
  render: () => html`
    <strata-menu>
      <strata-menu-item label="Overview"></strata-menu-item>
      <strata-menu-item label="Settings"></strata-menu-item>
      <strata-menu-item label="Help"></strata-menu-item>
    </strata-menu>
  `,
};
