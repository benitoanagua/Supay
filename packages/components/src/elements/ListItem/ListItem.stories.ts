import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = {
  title: "Components/ListItem",
  component: "strata-list-item",
};
export default meta;
export const Default: StoryObj = {
  render: () =>
    `<strata-list><strata-list-item title="Item" description="Description"></strata-list-item></strata-list>`,
};
