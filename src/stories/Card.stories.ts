import type { Meta, StoryObj } from "@storybook/html";
import {
  randUrl,
  randParagraph,
  randPhrase,
  randText,
  randFullName,
  randAvatar,
  randNumber,
  randMonth,
} from "@ngneat/falso";

interface CardProps {
  title: string;
  url: string;
  excerpt: string;
  feature_image: string;
  tag_name: string;
  tag_url: string;
  author_name: string;
  author_url: string;
  author_profile_image: string;
  reading_time: string;
  published_at: string;
  heading: number;
  density: string;
  media_align: string;
  media_width: string;
  aspect_ratio: string;
}

const meta = {
  title: "Components/Card",
  component: "wc-card",
  tags: ["autodocs"],
  argTypes: {
    heading: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
    },
    density: {
      control: { type: "select" },
      options: ["normal", "compact", "minimal"],
    },
    media_align: {
      control: { type: "select" },
      options: ["left", "right", "top", "bottom"],
    },
    media_width: {
      control: { type: "select" },
      options: [
        "is-half",
        "is-two-fifths",
        "is-one-third",
        "is-one-quarter",
        "is-one-fifth",
      ],
    },
    aspect_ratio: {
      control: { type: "select" },
      options: ["monitor", "square", "video"],
    },
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

const cardData = {
  title: randPhrase(),
  url: randUrl(),
  excerpt: randParagraph(),
  feature_image: "https://picsum.photos/400/300",
  tag_name: randText(),
  tag_url: randUrl(),
  author_name: randFullName(),
  author_url: randUrl(),
  author_profile_image: randAvatar(),
  reading_time: `${randNumber({ min: 5, max: 25 })} min read`,
  published_at: `${randMonth({ abbreviation: true })} ${randNumber({
    min: 1,
    max: 30,
  })}, 2023`,
};

export const Default: Story = {
  args: {
    ...cardData,
    heading: 4,
    density: "compact",
    media_align: "left",
    media_width: "is-half",
    aspect_ratio: "monitor",
  },
};

export const RightAligned: Story = {
  args: {
    ...cardData,
    media_align: "right",
    media_width: "is-half",
  },
};

export const TopAligned: Story = {
  args: {
    ...cardData,
    media_align: "top",
  },
};

export const BottomAligned: Story = {
  args: {
    ...cardData,
    media_align: "bottom",
  },
};

export const NormalDensity: Story = {
  args: {
    ...cardData,
    density: "normal",
  },
};

export const MinimalDensity: Story = {
  args: {
    ...cardData,
    density: "minimal",
  },
};
