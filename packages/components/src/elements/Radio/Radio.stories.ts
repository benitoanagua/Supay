import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/Radio", component: "strata-radio" };
export default meta;
export const Default: StoryObj = {
  render: () => `<strata-radio label="Option"></strata-radio>`,
};
