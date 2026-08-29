import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/Drawer", component: "strata-drawer" };
export default meta;
export const Default: StoryObj = { render: () => `<strata-drawer></strata-drawer>` };
