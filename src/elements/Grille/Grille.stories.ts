import type { Meta, StoryObj } from "@storybook/html";
import { randPhrase } from "@ngneat/falso";

interface GrilleProps {
  desktop?: number;
  mobile?: number;
  gap?: "small" | "medium" | "large";
}

const meta = {
  title: "Components/Grille",
  component: "wc-grille",
  tags: ["autodocs"],
  argTypes: {
    desktop: { control: { type: "range", min: 1, max: 6, step: 1 } },
    mobile: { control: { type: "range", min: 1, max: 3, step: 1 } },
    gap: { control: "select", options: ["small", "medium", "large"] },
  },
  render: (args: GrilleProps) => {
    const grille = document.createElement("wc-grille");

    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined) {
        grille.setAttribute(key, String(value));
      }
    });

    // Create grille items
    for (let i = 0; i < 7; i++) {
      const div = document.createElement("div");
      div.textContent = `${i + 1}. ${randPhrase()}`;
      div.style.padding = "12px";
      div.style.minHeight = "80px";
      grille.appendChild(div);
    }

    return grille;
  },
} satisfies Meta<GrilleProps>;

export default meta;
type Story = StoryObj<GrilleProps>;

export const StructuralGrid: Story = {
  args: {
    desktop: 3,
    mobile: 2,
    gap: "medium",
  },
};

export const Playground: Story = {
  args: {
    desktop: 3,
    mobile: 2,
    gap: "medium",
  },
  parameters: {
    controls: { expanded: true },
  },
};
