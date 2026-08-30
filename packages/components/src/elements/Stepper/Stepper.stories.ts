import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Components/Stepper", component: "strata-stepper" };
export default meta;

export const Default: StoryObj = { render: () => html`<strata-stepper value="3"></strata-stepper>` };
