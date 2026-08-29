import type { Meta, StoryObj } from "@storybook/html";

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
    variant: {
      control: "select",
      options: ["default", "bordered", "separated"],
    },
  },
  render: (args: AccordionProps) => {
    const accordion = document.createElement("strata-accordion");

    if (args.multiple) accordion.setAttribute("multiple", "true");
    if (args.variant) accordion.setAttribute("variant", args.variant);

    // Create accordion items
    for (let i = 0; i < 3; i++) {
      const item = document.createElement("strata-accordion-item");
      if (i === 0) item.setAttribute("open", "true");

      const header = document.createElement("div");
      header.slot = "header";
      header.innerHTML = `
        <div class="strata-story-row">
          <iconify-icon icon="carbon:document" aria-hidden="true" class="strata-story-icon"></iconify-icon>
          <span class="strata-story-medium">Section ${i + 1}</span>
        </div>
      `;

      const content = document.createElement("div");
      content.innerHTML = `
        <p class="strata-story-secondary">Accordion content keeps the panel layout intact and lets typography carry the hierarchy.</p>
        <div class="strata-story-callout strata-story-callout--compact">
          <p class="strata-story-secondary strata-story-small">Semantic color is used sparingly, as a signal, not decoration.</p>
        </div>
      `;

      item.appendChild(header);
      item.appendChild(content);
      accordion.appendChild(item);
    }

    return accordion;
  },
} satisfies Meta<AccordionProps>;

export default meta;
type Story = StoryObj<AccordionProps>;

export const Structural: Story = {};

export const MultipleOpen: Story = {
  args: {
    multiple: true,
  },
};

export const Playground: Story = {
  args: {
    multiple: false,
    variant: "default",
  },
  parameters: {
    controls: { expanded: true },
  },
};
