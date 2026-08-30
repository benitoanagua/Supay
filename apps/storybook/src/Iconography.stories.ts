import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";

const meta: Meta = { title: "Foundations/Iconography" };
export default meta;
type Story = StoryObj;
const icons = [
  "add",
  "close",
  "settings",
  "search",
  "arrow-left",
  "arrow-right",
  "checkmark",
  "warning",
  "information",
  "error",
  "home",
  "menu",
  "edit",
  "trash-can",
  "download",
  "upload",
];
export const Carbon: Story = {
  render: () =>
    `<section class="strata-story-iconography-page"><p><strong>Only Carbon.</strong> STRATA uses <code>@iconify-json/carbon</code> through <code>iconify-icon</code> directly.</p><div class="strata-story-icon-grid">${icons.map((name) => `<div class="strata-story-icon-cell"><iconify-icon icon="carbon:${name}" ></iconify-icon><code >carbon:${name}</code></div>`).join("")}</div></section>`,
};
