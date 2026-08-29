import type { Meta, StoryObj } from "@storybook/html";

interface CarouselProps {
  desktop?: number;
  mobile?: number;
  gap?: "none" | "small" | "medium" | "large" | "xlarge";
  autoPlay?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  interval?: number;
}

const meta = {
  title: "Components/Carousel",
  component: "strata-carousel",
  tags: ["autodocs"],
  argTypes: {
    desktop: { control: { type: "range", min: 1, max: 6, step: 1 } },
    mobile: { control: { type: "range", min: 1, max: 3, step: 1 } },
    gap: {
      control: "select",
      options: ["none", "small", "medium", "large", "xlarge"],
    },
    autoPlay: { control: "boolean" },
    showArrows: { control: "boolean" },
    showDots: { control: "boolean" },
    interval: { control: { type: "range", min: 1000, max: 10000, step: 1000 } },
  },
  render: (args: CarouselProps) => {
    const carousel = document.createElement("strata-carousel");

    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined) {
        carousel.setAttribute(
          key.replace(/([A-Z])/g, "-$1").toLowerCase(),
          String(value)
        );
      }
    });

    // Create carousel items
    for (let i = 0; i < 6; i++) {
      const item = document.createElement("strata-carousel-item");
      const content = document.createElement("div");
      content.className =
        "strata-story-carousel-slide";
      content.innerHTML = `
        <div class="strata-story-center">
          <div class="strata-story-number">${i + 1}</div>
          <p class="strata-story-secondary">Editorial item for the STRATA carousel.</p>
        </div>
      `;
      item.appendChild(content);
      carousel.appendChild(item);
    }

    return carousel;
  },
} satisfies Meta<CarouselProps>;

export default meta;
type Story = StoryObj<CarouselProps>;

export const Structural: Story = {
  args: {
    desktop: 3,
    mobile: 1,
    gap: "medium",
    showArrows: true,
    showDots: true,
  },
};

export const Playground: Story = {
  args: {
    desktop: 3,
    mobile: 1,
    gap: "medium",
    autoPlay: false,
    showArrows: true,
    showDots: true,
    interval: 5000,
  },
  parameters: {
    controls: { expanded: true },
  },
};
