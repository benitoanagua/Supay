import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Governance/Compliance" };
export default meta;
type Story = StoryObj;

export const Scale: Story = { render: () => html`<section class="strata-story-foundation-page"><h1>Scale</h1><div class="strata-story-scale-grid">${["micro", "small", "medium", "large", "hero"].map((size) => html`<strata-surface size=${size}><strong>${size.toUpperCase()}</strong><p>radius · border · elevation</p></strata-surface>`)}</div></section>` };
export const Iconography: Story = { render: () => html`<section class="strata-story-foundation-page"><h1>Iconography</h1><div class="strata-story-icon-grid">${["add", "close", "search", "settings", "arrow-left", "arrow-right", "checkmark", "warning", "information"].map((name) => html`<div class="strata-story-icon-cell"><iconify-icon icon=${`carbon:${name}`} aria-hidden="true"></iconify-icon><span class="strata-code-label">carbon:${name}</span></div>`)}</div></section>` };
