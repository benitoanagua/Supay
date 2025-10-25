import type { Meta, StoryObj } from "@storybook/html";
import { randPhrase, randFullName } from "@ngneat/falso";
import type {
  OverlayAlign,
  OverlayPosition,
  OverlayFill,
  OverlayBox,
} from "../../types/overlay.js";
import type { CardAspectRatio, CardHeading } from "../../types/card.js";

interface OverlayProps {
  title?: string;
  feature_image?: string;
  tag_name?: string;
  author_name?: string;
  published_at?: string;
  reading_time?: string;
  aspect_ratio?: CardAspectRatio;
  heading?: CardHeading;
  show_meta?: boolean;
  align?: OverlayAlign;
  position?: OverlayPosition;
  box?: OverlayBox;
  fill?: OverlayFill;
}

const meta = {
  title: "Components/Overlay",
  component: "wc-overlay",
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    feature_image: { control: "text" },
    tag_name: { control: "text" },
    author_name: { control: "text" },
    published_at: { control: "text" },
    reading_time: { control: "text" },
    aspect_ratio: { control: "radio", options: ["monitor", "square", "video"] },
    heading: { control: { type: "range", min: 1, max: 6, step: 1 } },
    show_meta: { control: "boolean" },
    align: { control: "select", options: ["start", "center", "end"] },
    position: { control: "select", options: ["top", "center", "bottom"] },
    box: {
      control: "select",
      options: ["border", "background", "transparent"],
    },
    fill: { control: "select", options: ["full", "gradient", "none"] },
  },
  render: (args: OverlayProps) => {
    const overlay = document.createElement("wc-overlay");

    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        overlay.setAttribute(key.replace(/_/g, "-"), String(value));
      }
    });

    return overlay;
  },
} satisfies Meta<OverlayProps>;

export default meta;
type Story = StoryObj<OverlayProps>;

export const Structural: Story = {
  args: {
    title: randPhrase(),
    feature_image: "https://picsum.photos/800/600",
    position: "bottom",
    box: "border",
    show_meta: true,
    author_name: randFullName(),
  },
};

export const Playground: Story = {
  args: {
    title: "Customizable Overlay",
    feature_image: "https://picsum.photos/800/600",
    tag_name: "Technology",
    author_name: "Jane Smith",
    published_at: "December 15, 2024",
    reading_time: "5 min read",
    aspect_ratio: "monitor",
    heading: 3,
    show_meta: true,
    align: "center",
    position: "center",
    box: "background",
    fill: "gradient",
  },
  parameters: {
    controls: { expanded: true },
  },
};
