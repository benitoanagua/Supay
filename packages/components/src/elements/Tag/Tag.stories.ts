import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/Tag", component: "strata-tag" };
export default meta;
export const Default: StoryObj = { render: () => `<strata-tag></strata-tag>` };
