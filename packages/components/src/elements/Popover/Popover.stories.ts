import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/Popover", component: "strata-popover" };
export default meta;
export const Default: StoryObj = { render: () => `<strata-popover></strata-popover>` };
