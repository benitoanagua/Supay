import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = {
  title: "Components/SearchField",
  component: "strata-search-field",
};
export default meta;
export const Default: StoryObj = {
  render: () => `<strata-search-field></strata-search-field>`,
};
