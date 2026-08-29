import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/ListItem", component: "strata-list-item" };
export default meta;
export const Default: StoryObj = { render: () => `<strata-list-item></strata-list-item>` };
