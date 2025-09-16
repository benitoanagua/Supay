import type { Meta, StoryObj } from "@storybook/html";
import { randParagraph } from "@ngneat/falso";

const meta = {
  title: "Components/Offcanvas",
  component: "wc-offcanvas",
  tags: ["autodocs"],
  render: () => {
    const offcanvas = document.createElement("wc-offcanvas");

    const openBtn = document.createElement("span");
    openBtn.setAttribute("slot", "open");
    openBtn.className = "block h-6 w-6 i-ri-menu-line";
    offcanvas.appendChild(openBtn);

    const content = document.createElement("p");
    content.setAttribute("slot", "content");
    content.className = "m-0";
    content.textContent = randParagraph();
    offcanvas.appendChild(content);

    return offcanvas;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};
