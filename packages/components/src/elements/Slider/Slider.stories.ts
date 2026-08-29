import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/Slider", component: "strata-slider" };
export default meta;
export const Default: StoryObj = { render: () => `<strata-slider></strata-slider>` };
