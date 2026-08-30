import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Components/BottomSheet", component: "strata-bottom-sheet", tags: ["autodocs"] };
export default meta;

export const Default: StoryObj = {
  render: () => html`<strata-bottom-sheet open title="Details"><div class="strata-story-stack"><p class="strata-story-secondary">Bottom sheet content is provided through the default slot.</p><strata-button label="Confirm"></strata-button></div></strata-bottom-sheet>`,
};
