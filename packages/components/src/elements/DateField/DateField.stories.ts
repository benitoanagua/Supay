import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/DateField", component: "strata-date-field" };
export default meta;
export const Default: StoryObj = { render: () => `<strata-date-field></strata-date-field>` };
