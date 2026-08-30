import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "@strata/components";

interface ButtonGroupProps {
  orientation?: "horizontal" | "vertical";
}

const meta = {
  title: "Components/ButtonGroup",
  component: "strata-button-group",
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
  },
  render: (args: ButtonGroupProps) => html`
    <strata-button-group .orientation=${args.orientation ?? "horizontal"}>
      <strata-button label="Primary" variant="filled"></strata-button>
      <strata-button label="Secondary" variant="outlined"></strata-button>
      <strata-button label="Cancel" variant="text"></strata-button>
    </strata-button-group>
  `,
} satisfies Meta<ButtonGroupProps>;

export default meta;
type Story = StoryObj<ButtonGroupProps>;

export const Default: Story = { args: { orientation: "horizontal" } };
export const Vertical: Story = { args: { orientation: "vertical" } };
