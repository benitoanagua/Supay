import type { Meta, StoryObj } from "@storybook/html";
import { randPhrase } from "@ngneat/falso";

interface GrilleProps {
  desktop: number;
  mobile: number;
  gap: string;
}

const meta = {
  title: "Components/Grille",
  component: "wc-grille",
  tags: ["autodocs"],
  argTypes: {
    desktop: {
      control: { type: "number", min: 1, max: 6 },
    },
    mobile: {
      control: { type: "number", min: 1, max: 3 },
    },
    gap: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
  },
  render: (args: GrilleProps) => {
    const grille = document.createElement("wc-grille");

    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        grille.setAttribute(key, String(value));
      }
    });

    const posts = Array.from({ length: 7 }, () => ({
      title: randPhrase(),
    }));

    posts.forEach((post, i) => {
      const span = document.createElement("span");
      span.textContent = `${i}.- ${post.title}`;
      span.style.display = "block";
      span.style.padding = "8px";
      grille.appendChild(span);
    });

    return grille;
  },
} satisfies Meta<GrilleProps>;

export default meta;
type Story = StoryObj<GrilleProps>;

export const Default: Story = {
  args: {
    desktop: 3,
    mobile: 2,
    gap: "medium",
  },
};

export const FourColumns: Story = {
  args: {
    desktop: 4,
    mobile: 1,
    gap: "medium",
  },
};

export const SmallGap: Story = {
  args: {
    desktop: 3,
    mobile: 2,
    gap: "small",
  },
};

export const LargeGap: Story = {
  args: {
    desktop: 3,
    mobile: 2,
    gap: "large",
  },
};
