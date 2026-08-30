import type { Meta, StoryObj } from "@storybook/html";
import "@strata/components";
import "iconify-icon";

const meta: Meta = {
  title: "Governance/Design Laws",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

export const ScaleLaw: Story = {
  render: () => `
    <main class="strata-law-page">
      <p class="strata-kicker">STRATA / Law 01</p>
      <h1>Physical scale determines structural weight.</h1>
      <p class="strata-lead">As a component grows, its permitted radius, border and elevation grow with it. Smaller elements stay visually light.</p>
      <div class="strata-law-grid">
        ${["micro", "small", "medium", "large", "hero"].map((size) => `<strata-surface size="${size}"><strong>${size.toUpperCase()}</strong><p>radius · border · elevation</p></strata-surface>`).join("")}
      </div>
      <strata-divider variant="double"></strata-divider>
      <h2>Semantic emphasis does not override physical scale.</h2>
      <p>A high-priority small action may use strong typography or semantic color, but it must not borrow the geometry of a large surface.</p>
    </main>`,
};

export const Iconography: Story = {
  render: () => `
    <main class="strata-law-page">
      <p class="strata-kicker">STRATA / Iconography</p>
      <h1>Carbon is the only allowed icon collection.</h1>
      <p class="strata-lead">Use Iconify directly with the Carbon namespace. STRATA does not introduce an icon abstraction layer.</p>
      <div class="strata-icon-grid">
        ${["add", "close", "search", "settings", "arrow-left", "arrow-right", "checkmark", "warning", "information"].map((name) => `<div><iconify-icon icon="carbon:${name}"></iconify-icon><span class="strata-code-label">carbon:${name}</span></div>`).join("")}
      </div>
    </main>`,
};
