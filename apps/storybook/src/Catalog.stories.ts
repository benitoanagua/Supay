import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";

const meta: Meta = {
  title: "STRATA/Catalog",
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj;

const examples = [
  ["Actions / Button", `<strata-button label="Continue" icon="carbon:arrow-right"></strata-button>`],
  ["Actions / Icon Button", `<strata-icon-button icon="carbon:settings" label="Settings"></strata-icon-button>`],
  ["Forms / Search", `<strata-search-field placeholder="Search"></strata-search-field>`],
  ["Forms / Number", `<strata-number-field value="1280"></strata-number-field>`],
  ["Navigation / Item", `<strata-nav-item label="Home" selected></strata-nav-item>`],
  ["Feedback / Alert", `<strata-alert tone="info">Information</strata-alert>`],
  ["Feedback / Progress", `<strata-progress value="65"></strata-progress>`],
  ["Editorial / Divider", `<strata-divider variant="double"></strata-divider>`],
  ["Data / Tag", `<strata-tag label="Editorial"></strata-tag>`],
  ["Overlay / Tooltip", `<strata-tooltip text="Carbon icon"><span>Hover</span></strata-tooltip>`],
] as const;

export const Overview: Story = {
  render: () => `<section style="display:grid;gap:24px;max-width:720px">${examples.map(([title, markup]) => `<article><h3 style="font-family:'Source Sans 3',sans-serif">${title}</h3><div style="padding:16px;border-bottom:1px solid currentColor">${markup}</div></article>`).join("")}</section>`,
};
