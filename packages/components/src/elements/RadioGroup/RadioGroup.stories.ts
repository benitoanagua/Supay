import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/RadioGroup", component: "strata-radio-group" };
export default meta;
export const Default: StoryObj = { render: () => `<strata-radio-group></strata-radio-group>` };
