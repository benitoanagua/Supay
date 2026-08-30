import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

const meta: Meta = { title: "Editorial/Principles" };
export default meta;
type Story = StoryObj;

export const NewspaperToMagazine: Story = {
  render: () => html`
    <article class="strata-story-editorial-page">
      <header class="strata-story-editorial-header">
        <p class="strata-story-editorial-kicker">STRATA / Editorial</p>
        <h1 class="strata-story-editorial-title">
          Structure in monochrome.<br>Meaning in color.
        </h1>
        <p class="strata-story-editorial-lead">
          Classic newspaper discipline meets contemporary magazine clarity. Typography leads; dividers organize; spectrum signals.
        </p>
      </header>
      <div class="strata-story-editorial-grid">
        <section>
          <h2>01 / Typography</h2>
          <p>Source Sans 3 carries the interface. Source Code Pro handles measurements, numbers and metadata.</p>
        </section>
        <section>
          <h2>02 / Structure</h2>
          <p>Scale controls radius, border and elevation. Not every block needs a border.</p>
        </section>
        <section>
          <h2>03 / Spectrum</h2>
          <p>
            <strata-badge tone="red">error</strata-badge>
            <strata-badge tone="green">success</strata-badge>
            <strata-badge tone="violet">special</strata-badge>
          </p>
        </section>
      </div>
      <strata-divider variant="double"></strata-divider>
      <p class="strata-story-numeric">EDITORIAL SYSTEM · MOBILE FIRST · STRATA</p>
    </article>
  `,
};
