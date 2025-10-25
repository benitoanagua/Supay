import type { Meta, StoryObj } from "@storybook/html";
import { randParagraph, randMusicGenre } from "@ngneat/falso";

interface AccordionProps {
  multiple?: boolean;
  variant?: "default" | "bordered" | "separated";
}

const meta = {
  title: "Components/Accordion",
  component: "wc-accordion",
  tags: ["autodocs"],
  argTypes: {
    multiple: { control: "boolean" },
    variant: {
      control: "select",
      options: ["default", "bordered", "separated"],
    },
  },
  render: (args: AccordionProps) => {
    const accordion = document.createElement("wc-accordion");

    if (args.multiple) accordion.setAttribute("multiple", "true");
    if (args.variant) accordion.setAttribute("variant", args.variant);

    // Create accordion items
    for (let i = 0; i < 3; i++) {
      const item = document.createElement("wc-accordion-item");
      if (i === 0) item.setAttribute("open", "true");

      const header = document.createElement("div");
      header.slot = "header";
      header.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="icon-[carbon--document] w-5 h-5 text-primary"></span>
          <span class="font-medium">Section ${i + 1}</span>
        </div>
      `;

      const content = document.createElement("div");
      content.innerHTML = `
        <p class="text-onSurfaceVariant">${randParagraph()}</p>
        <div class="mt-3 p-3 bg-surfaceContainerLow border-l-4 border-primary">
          <p class="text-onSurfaceVariant text-sm">${randMusicGenre()}</p>
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
