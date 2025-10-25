import type { Meta, StoryObj } from "@storybook/html";
import { randParagraph } from "@ngneat/falso";
import type {
  ModalSize,
  ModalPosition,
  ModalVariant,
  ModalAnimation,
} from "../../types/modal.js";

interface ModalProps {
  open?: boolean;
  title?: string;
  size?: ModalSize;
  position?: ModalPosition;
  variant?: ModalVariant;
  animation?: ModalAnimation;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  showClose?: boolean;
  preventScroll?: boolean;
}

const meta = {
  title: "Components/Modal",
  component: "wc-modal",
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    size: {
      control: "select",
      options: ["small", "medium", "large", "xlarge", "full"],
    },
    position: {
      control: "select",
      options: ["center", "top", "bottom", "left", "right"],
    },
    variant: {
      control: "select",
      options: [
        "default",
        "minimal",
        "bordered",
        "outlined",
        "glass",
        "accent-top",
        "accent-left",
      ],
    },
    animation: {
      control: "select",
      options: ["slide-up", "zoom", "slide-right", "slide-left"],
    },
    closeOnOverlay: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
    showClose: { control: "boolean" },
    preventScroll: { control: "boolean" },
  },
  render: (args: ModalProps) => {
    const modal = document.createElement("wc-modal");

    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined) {
        modal.setAttribute(
          key.replace(/([A-Z])/g, "-$1").toLowerCase(),
          String(value)
        );
      }
    });

    const content = document.createElement("div");
    content.innerHTML = `
      <div class="space-y-4">
        <p class="text-onSurfaceVariant">${randParagraph()}</p>
        <div class="p-4 bg-surfaceContainerLow border-l-4 border-primary">
          <p class="text-onSurfaceVariant text-sm">${randParagraph().substring(0, 120)}</p>
        </div>
      </div>
    `;

    const footer = document.createElement("div");
    footer.slot = "footer";
    footer.innerHTML = `
      <div class="flex items-center justify-end gap-3">
        <wc-button label="Cancel" variant="outlined" size="medium"></wc-button>
        <wc-button label="Confirm" variant="filled" size="medium"></wc-button>
      </div>
    `;

    modal.appendChild(content);
    modal.appendChild(footer);
    return modal;
  },
} satisfies Meta<ModalProps>;

export default meta;
type Story = StoryObj<ModalProps>;

export const Structural: Story = {
  args: {
    open: true,
    title: "Structural Modal",
    size: "medium",
    showClose: true,
  },
};

export const Playground: Story = {
  args: {
    open: true,
    title: "Customizable Modal",
    size: "medium",
    position: "center",
    variant: "default",
    animation: "slide-up",
    closeOnOverlay: true,
    closeOnEscape: true,
    showClose: true,
    preventScroll: true,
  },
  parameters: {
    controls: { expanded: true },
  },
};
