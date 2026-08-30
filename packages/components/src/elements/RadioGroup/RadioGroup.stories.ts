import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Components/RadioGroup", component: "strata-radio-group" };
export default meta;

export const Default: StoryObj = {
  render: () => html`
    <strata-radio-group label="Choose an option">
      <strata-radio label="Option A" value="a"></strata-radio>
      <strata-radio label="Option B" value="b"></strata-radio>
      <strata-radio label="Option C" value="c"></strata-radio>
    </strata-radio-group>
  `,
};
