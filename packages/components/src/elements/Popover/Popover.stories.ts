import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Components/Popover", component: "strata-popover", tags: ["autodocs"] };
export default meta;

export const Default: StoryObj = {
  render: () => html`<strata-popover open><div class="strata-story-stack"><strong>Popover content</strong><span class="strata-story-secondary">Supporting contextual information.</span></div></strata-popover>`,
};
