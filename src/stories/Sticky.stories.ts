import type { Meta, StoryObj } from "@storybook/html";

const meta = {
  title: "Components/Sticky",
  component: "wc-sticky",
  tags: ["autodocs"],
  render: () => {
    const sticky = document.createElement("wc-sticky");

    const content = document.createElement("span");
    content.className = "py-2 px-4 font-sans font-700 uppercase bg-red-500";
    content.textContent = "Aquí estoy";
    sticky.appendChild(content);

    return sticky;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
