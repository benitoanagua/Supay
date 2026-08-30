import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/List", component: "strata-list" };
export default meta;
export const Default: StoryObj = {
  render: () => `<strata-list></strata-list>`,
};
