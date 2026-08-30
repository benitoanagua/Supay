import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Components/Snackbar", component: "strata-snackbar", tags: ["autodocs"] };
export default meta;

export const Default: StoryObj = {
  render: () => html`<strata-snackbar open message="Changes saved successfully"></strata-snackbar>`,
};
