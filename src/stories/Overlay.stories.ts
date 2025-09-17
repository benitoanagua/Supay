import type { Meta, StoryObj } from "@storybook/html";
import {
  randUrl,
  randPhrase,
  randWord,
  randFullName,
  randNumber,
  randMonth,
} from "@ngneat/falso";

const meta = {
  title: "Components/Overlay",
  component: "wc-overlay",
  tags: ["autodocs"],
  argTypes: {
    heading: {
      control: { type: "range", min: 1, max: 6, step: 1 },
      description: "Heading level (1-6)",
    },
    aspect_ratio: {
      control: { type: "radio" },
      options: ["monitor", "square", "video"],
      description: "Image aspect ratio",
    },
    show_meta: {
      control: { type: "boolean" },
      description: "Show meta information",
    },
    show_category: {
      control: { type: "boolean" },
      description: "Show category tag",
    },
    font_group: {
      control: { type: "select" },
      options: ["default", "supplement", "sans", "serif"],
      description: "Font family group",
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
      description: "Horizontal alignment",
    },
    position: {
      control: { type: "select" },
      options: ["top", "center", "bottom"],
      description: "Vertical position",
    },
    box: {
      control: { type: "select" },
      options: ["border", "background", "transparent"],
      description: "Content box style",
    },
    fill: {
      control: { type: "select" },
      options: ["full", "gradient", "none"],
      description: "Overlay fill type",
    },
    feature_image: {
      control: { type: "text" },
      description: "Background image URL",
    },
    tag_name: {
      control: { type: "text" },
      description: "Category tag name",
    },
    author_name: {
      control: { type: "text" },
      description: "Author name",
    },
    published_at: {
      control: { type: "text" },
      description: "Publication date",
    },
    reading_time: {
      control: { type: "text" },
      description: "Reading time",
    },
  },
  render: (args) => {
    const overlay = document.createElement("wc-overlay");

    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        overlay.setAttribute(key.replace(/_/g, "-"), String(value));
      }
    });

    return overlay;
  },
};

export default meta;
type Story = StoryObj<any>;

const overlayData = {
  title: randPhrase(),
  url: randUrl(),
  feature_image: "https://picsum.photos/800/600",
  tag_name: randWord(),
  author_name: randFullName(),
  published_at: `${randMonth({ abbreviation: true })} ${randNumber({
    min: 1,
    max: 30,
  })}, ${randNumber({ min: 2020, max: 2024 })}`,
  reading_time: `${randNumber({ min: 5, max: 25 })} min read`,
};

export const Default: Story = {
  args: {
    ...overlayData,
    heading: 2,
    aspect_ratio: "monitor",
    show_meta: true,
    show_category: true,
    font_group: "default",
    align: "center",
    position: "center",
    box: "background",
    fill: "full",
  },
};

export const Minimal: Story = {
  args: {
    ...overlayData,
    heading: 4,
    aspect_ratio: "square",
    show_meta: false,
    show_category: false,
    font_group: "sans",
    align: "start",
    position: "bottom",
    box: "transparent",
    fill: "none",
  },
};

export const TopAligned: Story = {
  args: {
    ...overlayData,
    heading: 2,
    aspect_ratio: "monitor",
    show_meta: true,
    show_category: true,
    font_group: "default",
    align: "start",
    position: "top",
    box: "background",
    fill: "gradient",
  },
};

export const GradientOverlay: Story = {
  args: {
    ...overlayData,
    heading: 1,
    aspect_ratio: "monitor",
    show_meta: true,
    show_category: true,
    font_group: "serif",
    align: "center",
    position: "bottom",
    box: "transparent",
    fill: "gradient",
  },
};

export const NoOverlay: Story = {
  args: {
    ...overlayData,
    heading: 4,
    aspect_ratio: "square",
    show_meta: true,
    show_category: true,
    font_group: "sans",
    align: "center",
    position: "center",
    box: "background",
    fill: "none",
  },
};

export const Playground: Story = {
  args: {
    ...overlayData,
    heading: 2,
    aspect_ratio: "monitor",
    show_meta: true,
    show_category: true,
    font_group: "default",
    align: "center",
    position: "center",
    box: "background",
    fill: "full",
  },
  parameters: {
    controls: {
      expanded: true,
      sort: "alpha",
    },
  },
};
