import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/Tooltip", component: "strata-tooltip" };
export default meta;
export const Default: StoryObj = {
  render: () => `<strata-tooltip></strata-tooltip>`,
};
