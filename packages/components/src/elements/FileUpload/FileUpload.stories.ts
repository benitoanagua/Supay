import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/FileUpload", component: "strata-file-upload" };
export default meta;
export const Default: StoryObj = { render: () => `<strata-file-upload></strata-file-upload>` };
