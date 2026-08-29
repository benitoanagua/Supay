import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
const meta: Meta = { title: "Components/Snackbar", component: "strata-snackbar" };
export default meta;
export const Default: StoryObj = { render: () => `<strata-snackbar></strata-snackbar>` };
