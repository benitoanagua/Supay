import type { Meta, StoryObj } from "@storybook/html";
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
  component: "strata-modal",
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
    const modal = document.createElement("strata-modal");

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
      <div class="strata-story-stack">
        <p class="strata-story-secondary">STRATA is a contemporary editorial design system built on monochrome structure and semantic color. Typography leads hierarchy, and physical scale determines structural weight.</p>
        <div class="strata-story-callout">
          <p class="strata-story-secondary strata-story-small">Color establishes meaning. Use the semantic spectrum only as a signal, never as decoration.</p>
        </div>
      </div>
    `;

    const footer = document.createElement("div");
    footer.slot = "footer";
    footer.innerHTML = `
      <div class="strata-story-actions">
        <strata-button label="Cancel" variant="outlined" size="medium"></strata-button>
        <strata-button label="Confirm" variant="filled" size="medium"></strata-button>
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
