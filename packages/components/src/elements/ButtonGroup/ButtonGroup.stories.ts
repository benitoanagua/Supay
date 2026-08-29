import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/ButtonGroup", component: "strata-button-group" };
export default meta;
export const Default: StoryObj = { render: () => `<strata-button-group></strata-button-group>` };
