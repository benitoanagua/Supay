import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/Breadcrumb", component: "strata-breadcrumb" };
export default meta;
export const Default: StoryObj = { render: () => `<strata-breadcrumb></strata-breadcrumb>` };
