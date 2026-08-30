import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";
const meta: Meta = {
  title: "Components/FileUpload",
  component: "strata-file-upload",
};
export default meta;
export const Default: StoryObj = {
  render: () => html`<strata-file-upload></strata-file-upload>`,
};
