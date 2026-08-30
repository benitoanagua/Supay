import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import type { TemplateResult } from "lit";
import "@strata/components";

interface AccordionProps {
  multiple?: boolean;
  variant?: "default" | "bordered" | "separated";
}

const meta = {
  title: "Components/Accordion",
  component: "strata-accordion",
  tags: ["autodocs"],
  argTypes: {
    multiple: { control: "boolean" },
    variant: { control: "select", options: ["default", "bordered", "separated"] },
  },
  render: (args: AccordionProps): TemplateResult => html`
    <strata-accordion ?multiple=${args.multiple ?? false} variant=${args.variant ?? "default"}>
      ${[0, 1, 2].map((i) => html`
        <strata-accordion-item ?open=${i === 0}>
          <div slot="header">
            <div class="strata-story-row">
              <iconify-icon icon="carbon:document" aria-hidden="true" class="strata-story-icon"></iconify-icon>
              <span class="strata-story-medium">Section ${i + 1}</span>
            </div>
          </div>
          <div>
            <p class="strata-story-secondary">Accordion content keeps the panel layout intact and lets typography carry the hierarchy.</p>
            <div class="strata-story-callout strata-story-callout--compact">
              <p class="strata-story-secondary strata-story-small">Semantic color is used sparingly, as a signal, not decoration.</p>
            </div>
          </div>
        </strata-accordion-item>
      `)}
    </strata-accordion>
  `,
} satisfies Meta<AccordionProps>;

export default meta;
type Story = StoryObj<AccordionProps>;

export const Structural: Story = { args: { multiple: false, variant: "default" } };
export const MultipleOpen: Story = { args: { multiple: true, variant: "default" } };
export const Playground: Story = {
  args: { multiple: false, variant: "default" },
  parameters: { controls: { expanded: true } },
};
