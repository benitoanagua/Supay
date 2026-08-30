import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";
interface TabsProps { activeTab?: number; disabled?: boolean; }
const meta = {
  title: "Components/Tabs", component: "strata-tabs", tags: ["autodocs"],
  argTypes: { activeTab: { control: { type: "range", min: 0, max: 2, step: 1 } }, disabled: { control: "boolean" } },
  render: (args: TabsProps) => html`
    <strata-tabs .activeTab=${args.activeTab ?? 0} ?disabled=${args.disabled ?? false}>
      ${["Structure", "Hierarchy", "Layout"].map((name, index) => html`
        <strata-tab slot="tabs" ?active=${index === (args.activeTab ?? 0)}>${name}</strata-tab>
        <strata-tab-panel slot="panels" ?active=${index === (args.activeTab ?? 0)}>
          <div class="strata-story-tab-panel"><h3 class="strata-story-tab-title">${name}</h3><p class="strata-story-secondary">STRATA separates content with typography, whitespace, and dividers.</p></div>
        </strata-tab-panel>
      `)}
    </strata-tabs>
  `,
} satisfies Meta<TabsProps>;
export default meta; type Story = StoryObj<TabsProps>;
export const Structural: Story = { args: { activeTab: 0, disabled: false } };
export const Playground: Story = { args: { activeTab: 0, disabled: false }, parameters: { controls: { expanded: true } } };
