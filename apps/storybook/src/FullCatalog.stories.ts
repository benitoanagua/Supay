import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";
import { STRATA_COMPONENT_CATALOG } from "@strata/components";

const meta: Meta = { title: "STRATA/Full Catalog", parameters: { layout: "padded" } };
export default meta;

export const Inventory: StoryObj = {
  render: () => html`
    <div class="strata-story-catalog-summary">
      <strong>${STRATA_COMPONENT_CATALOG.length} canonical entries</strong>
      <ol>${STRATA_COMPONENT_CATALOG.map((name) => html`<li><code>${name}</code></li>`)}</ol>
    </div>
  `,
};
