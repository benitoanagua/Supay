import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";
interface CarouselProps { desktop?: number; mobile?: number; gap?: "none" | "small" | "medium" | "large" | "xlarge"; autoPlay?: boolean; showArrows?: boolean; showDots?: boolean; interval?: number; }
const meta = {
  title: "Components/Carousel", component: "strata-carousel", tags: ["autodocs"],
  argTypes: { desktop: { control: { type: "range", min: 1, max: 6, step: 1 } }, mobile: { control: { type: "range", min: 1, max: 3, step: 1 } }, gap: { control: "select", options: ["none", "small", "medium", "large", "xlarge"] }, autoPlay: { control: "boolean" }, showArrows: { control: "boolean" }, showDots: { control: "boolean" }, interval: { control: { type: "range", min: 1000, max: 10000, step: 1000 } } },
  render: (args: CarouselProps) => html`
    <strata-carousel .desktop=${args.desktop ?? 3} .mobile=${args.mobile ?? 1} .gap=${args.gap ?? "medium"} .autoPlay=${args.autoPlay ?? false} .showArrows=${args.showArrows ?? true} .showDots=${args.showDots ?? true} .interval=${args.interval ?? 5000}>
      ${Array.from({ length: 6 }, (_, i) => html`
        <strata-carousel-item>
          <div class="strata-story-carousel-slide"><div class="strata-story-center"><div class="strata-story-number">${i + 1}</div><p class="strata-story-secondary">Editorial item for the STRATA carousel.</p></div></div>
        </strata-carousel-item>
      `)}
    </strata-carousel>
  `,
} satisfies Meta<CarouselProps>;
export default meta; type Story = StoryObj<CarouselProps>;
export const Structural: Story = { args: { desktop: 3, mobile: 1, gap: "medium", showArrows: true, showDots: true } };
export const Playground: Story = { args: { desktop: 3, mobile: 1, gap: "medium", autoPlay: false, showArrows: true, showDots: true, interval: 5000 }, parameters: { controls: { expanded: true } } };
