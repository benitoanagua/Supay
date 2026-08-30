import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Components/Tag", component: "strata-tag" };
export default meta;

export const Default: StoryObj = { render: () => html`<strata-tag label="Editorial"></strata-tag>` };
