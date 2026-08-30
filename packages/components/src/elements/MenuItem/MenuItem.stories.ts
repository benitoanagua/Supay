import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = {
  title: "Components/MenuItem",
  component: "strata-menu-item",
};
export default meta;
export const Default: StoryObj = {
  render: () =>
    `<strata-menu><strata-menu-item label="Item"></strata-menu-item></strata-menu>`,
};
