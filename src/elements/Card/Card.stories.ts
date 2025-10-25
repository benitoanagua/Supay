import type { Meta, StoryObj } from "@storybook/html";
import {
  randCatchPhrase,
  randParagraph,
  randFullName,
  randAvatar,
  randWord,
  randUrl,
} from "@ngneat/falso";
import type { CardProps } from "../../types/card.js";

const meta = {
  title: "Components/Card",
  component: "wc-card",
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    excerpt: { control: "text" },
    feature_image: { control: "text" },
    author_name: { control: "text" },
    author_profile_image: { control: "text" },
    tag_name: { control: "text" },
    reading_time: { control: "text" },
    published_at: { control: "text" },
    heading: { control: { type: "range", min: 1, max: 6, step: 1 } },
    density: { control: "radio", options: ["normal", "compact", "minimal"] },
    media_align: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
    },
    aspect_ratio: { control: "radio", options: ["monitor", "square", "video"] },
    elevation: { control: { type: "range", min: 0, max: 3, step: 1 } },
  },
  render: (args: CardProps) => {
    const card = document.createElement("wc-card");
    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        card.setAttribute(key.replace(/_/g, "-"), String(value));
      }
    });
    return card;
  },
} satisfies Meta<CardProps>;

export default meta;
type Story = StoryObj<CardProps>;

const baseCardData = {
  title: randCatchPhrase(),
  excerpt: randParagraph(),
  author_name: randFullName(),
  author_profile_image: randAvatar(),
  tag_name: randWord(),
  reading_time: "5 min read",
  published_at: "Just now",
  url: randUrl(),
  tag_url: randUrl(),
  author_url: randUrl(),
};

export const StructuralElevation: Story = {
  args: {
    ...baseCardData,
    elevation: 2,
    density: "normal",
    feature_image: "https://picsum.photos/400/300",
  },
};

export const ElevationScale: Story = {
  render: () => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-2 gap-6 p-6";

    [0, 1, 2, 3].forEach((elevation) => {
      const card = document.createElement("wc-card");
      card.setAttribute("title", `Elevation ${elevation}`);
      card.setAttribute("excerpt", randParagraph());
      card.setAttribute("elevation", elevation.toString());
      card.setAttribute("density", "compact");
      container.appendChild(card);
    });

    return container;
  },
};

export const Playground: Story = {
  args: {
    title: "Customizable Card",
    excerpt: "This is a card with all properties available for customization.",
    feature_image: "https://picsum.photos/400/300",
    author_name: "John Doe",
    author_profile_image: "https://i.pravatar.cc/150?img=12",
    tag_name: "Technology",
    reading_time: "5 min read",
    published_at: "December 15, 2024",
    heading: 4,
    density: "normal",
    media_align: "left",
    aspect_ratio: "monitor",
    elevation: 2,
    url: "https://example.com",
    tag_url: "https://example.com/tag",
    author_url: "https://example.com/author",
  },
  parameters: {
    controls: { expanded: true },
  },
};
