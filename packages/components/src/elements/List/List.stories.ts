import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Components/List", component: "strata-list" };
export default meta;

export const Default: StoryObj = {
  render: () => html`
    <strata-list>
      <strata-list-item title="First item" description="Supporting description"></strata-list-item>
      <strata-list-item title="Second item" description="Another description"></strata-list-item>
      <strata-list-item title="Third item" description="More supporting content"></strata-list-item>
    </strata-list>
  `,
};
