import type { Meta, StoryObj } from "@storybook/html";

interface LogoProps {
  size: string;
  positive: boolean;
}

const meta = {
  title: "Components/Logo",
  component: "wc-logo",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    positive: {
      control: { type: "boolean" },
    },
  },
  render: (args: LogoProps) => {
    const logo = document.createElement("wc-logo");

    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        logo.setAttribute(key, String(value));
      }
    });

    return logo;
  },
} satisfies Meta<LogoProps>;

export default meta;
type Story = StoryObj<LogoProps>;

export const Default: Story = {
  args: {
    size: "medium",
    positive: false,
  },
};

export const Positive: Story = {
  args: {
    size: "medium",
    positive: true,
  },
};

export const Small: Story = {
  args: {
    size: "small",
    positive: false,
  },
};

export const Large: Story = {
  args: {
    size: "large",
    positive: false,
  },
};
