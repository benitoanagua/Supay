import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import type { ButtonProps } from "../../types/button.js";
import "@strata/components";

const meta = {
  title: "Components/Button",
  component: "strata-button",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    variant: { control: "select", options: ["outlined", "filled", "text", "tonal", "elevated"] },
    size: { control: "radio", options: ["small", "medium", "large"] },
    color: { control: "select", options: ["primary", "secondary", "error", "success", "warning"] },
    disabled: { control: "boolean" }, loading: { control: "boolean" }, fullWidth: { control: "boolean" },
    href: { control: "text" }, icon: { control: "text" }, trailingIcon: { control: "boolean" },
  },
  render: (args: ButtonProps) => html`
    <strata-button
      label=${args.label ?? ""}
      variant=${args.variant ?? "outlined"}
      size=${args.size ?? "medium"}
      color=${args.color ?? "primary"}
      .disabled=${args.disabled ?? false}
      .loading=${args.loading ?? false}
      .fullWidth=${args.fullWidth ?? false}
      href=${args.href ?? ""}
      icon=${args.icon ?? ""}
      .trailingIcon=${args.trailingIcon ?? false}
    ></strata-button>
  `,
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;
export const Outline: Story = { args: { label: "Outline Button", variant: "outlined", size: "medium" } };
export const StructuralVariants: Story = {
  render: () => html`
    <div class="strata-story-button-variants">
      ${["outlined", "filled", "text", "tonal"].map((variant) => html`
        <strata-button label=${variant} variant=${variant} size="medium"></strata-button>
      `)}
    </div>
  `,
};
export const Playground: Story = {
  args: { label: "Customize me", variant: "outlined", size: "medium", color: "primary", disabled: false, loading: false, fullWidth: false, href: "", icon: "carbon:settings", trailingIcon: false },
  parameters: { controls: { expanded: true } },
};
