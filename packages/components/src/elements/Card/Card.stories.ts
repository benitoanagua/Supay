import type { Meta, StoryObj } from "@storybook/html";
import type { CardProps } from "../../types/card.js";

const meta = {
  title: "Components/Card",
  component: "strata-card",
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
  },
  render: (args: CardProps) => {
    const card = document.createElement("strata-card");
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
  title: "Monochrome establishes structure",
  excerpt:
    "STRATA is a contemporary editorial design system. Typography leads hierarchy, and physical scale determines structural weight.",
  author_name: "Jane Smith",
  author_profile_image: "https://picsum.photos/seed/author/120/120",
  tag_name: "Editorial",
  reading_time: "5 min read",
  published_at: "Just now",
  url: "#",
  tag_url: "#",
  author_url: "#",
};

export const StructuralScale: Story = {
  args: {
    ...baseCardData,
    density: "normal",
    feature_image: "https://picsum.photos/400/300",
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
    url: "https://example.com",
    tag_url: "https://example.com/tag",
    author_url: "https://example.com/author",
  },
  parameters: {
    controls: { expanded: true },
  },
};
