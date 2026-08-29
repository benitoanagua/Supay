import type { Meta, StoryObj } from "@storybook/html";

interface LogoProps {
  className?: string;
}

const meta = {
  title: "Components/Logo",
  component: "strata-logo",
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Tailwind CSS classes (e.g., h-8 fill-primary)",
    },
  },
  render: (args: LogoProps) => {
    const logo = document.createElement("strata-logo");
    if (args.className) {
      logo.className = args.className;
    }
    return logo;
  },
} satisfies Meta<LogoProps>;

export default meta;
type Story = StoryObj<LogoProps>;

export const Structural: Story = {
  args: {
    className: "h-8 fill-primary",
  },
};

export const Playground: Story = {
  args: {
    className: "h-8 fill-primary",
  },
  parameters: {
    controls: { expanded: true },
  },
};
