import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/Stepper", component: "strata-stepper" };
export default meta;
export const Default: StoryObj = {
  render: () => `<strata-stepper></strata-stepper>`,
};
