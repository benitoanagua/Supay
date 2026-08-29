import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/Menu", component: "strata-menu" };
export default meta;
export const Default: StoryObj = { render: () => `<strata-menu></strata-menu>` };
