import type { Meta, StoryObj } from "@storybook/html";
import type { ButtonProps } from "../../types/button.js";

const meta = {
  title: "Components/Button",
  component: "wc-button",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["outlined", "filled", "text", "tonal", "elevated"],
    },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "error", "success", "warning"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
    fullWidth: { control: "boolean" },
    href: { control: "text" },
    icon: { control: "text" },
    trailingIcon: { control: "boolean" },
  },
  render: (args: ButtonProps) => {
    const button = document.createElement("wc-button");
    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        button.setAttribute(key, String(value));
      }
    });
    return button;
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

export const Outline: Story = {
  args: {
    label: "Outline Button",
    variant: "outlined",
    size: "medium",
  },
};

export const StructuralVariants: Story = {
  render: () => {
    const container = document.createElement("div");
    container.className = "flex flex-wrap items-center gap-4 p-6";

    const variants = ["outlined", "filled", "text", "tonal"];
    variants.forEach((variant) => {
      const button = document.createElement("wc-button");
      button.setAttribute("label", `${variant}`);
      button.setAttribute("variant", variant);
      button.setAttribute("size", "medium");
      container.appendChild(button);
    });

    return container;
  },
};

export const Playground: Story = {
  args: {
    label: "Customize me",
    variant: "outlined",
    size: "medium",
    color: "primary",
    disabled: false,
    loading: false,
    fullWidth: false,
    href: "",
    icon: "carbon--settings",
    trailingIcon: false,
  },
  parameters: {
    controls: { expanded: true },
  },
};
