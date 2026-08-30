import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Components/Drawer", component: "strata-drawer", tags: ["autodocs"] };
export default meta;

export const Default: StoryObj = {
  render: () => html`<strata-drawer open title="Navigation"><div class="strata-story-stack"><p class="strata-story-secondary">Drawer content is rendered through the component slot.</p><strata-button label="Continue"></strata-button></div></strata-drawer>`,
};
