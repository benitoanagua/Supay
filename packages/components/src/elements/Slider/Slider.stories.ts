import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";
const meta: Meta = { title: "Components/Slider", component: "strata-slider" };
export default meta;
export const Default: StoryObj = {
  render: () => html`<strata-slider></strata-slider>`,
};
