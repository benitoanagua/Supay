import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

interface GrilleProps { desktop?: number; mobile?: number; gap?: "small" | "medium" | "large"; }
const meta = {
  title: "Components/Grille", component: "strata-grille", tags: ["autodocs"],
  argTypes: { desktop: { control: { type: "range", min: 1, max: 6, step: 1 } }, mobile: { control: { type: "range", min: 1, max: 3, step: 1 } }, gap: { control: "select", options: ["small", "medium", "large"] } },
  render: (args: GrilleProps) => html`
    <strata-grille desktop=${args.desktop ?? 3} mobile=${args.mobile ?? 2} gap=${args.gap ?? "medium"}>
      ${Array.from({ length: 7 }, (_, i) => html`<div class="strata-story-grid-item">${i + 1}. Editorial headline</div>`)}
    </strata-grille>
  `,
} satisfies Meta<GrilleProps>;
export default meta; type Story = StoryObj<GrilleProps>;
export const StructuralGrid: Story = { args: { desktop: 3, mobile: 2, gap: "medium" } };
export const Playground: Story = { args: { desktop: 3, mobile: 2, gap: "medium" }, parameters: { controls: { expanded: true } } };
