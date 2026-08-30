import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = {
  title: "Components/BottomSheet",
  component: "strata-bottom-sheet",
};
export default meta;
export const Default: StoryObj = {
  render: () => `<strata-bottom-sheet></strata-bottom-sheet>`,
};
