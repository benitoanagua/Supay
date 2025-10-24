import type { Meta, StoryObj } from "@storybook/html";
import { randPhrase, randUrl } from "@ngneat/falso";
import type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  ButtonColor,
  ButtonType,
} from "../../types/button.js";

const meta = {
  title: "Components/Button",
  component: "wc-button",
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Button text content",
    },
    variant: {
      control: { type: "select" },
      options: [
        "filled",
        "outlined",
        "text",
        "elevated",
        "tonal",
      ] as ButtonVariant[],
      description: "Visual style variant",
    },
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"] as ButtonSize[],
      description: "Button size",
    },
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "error",
        "success",
        "warning",
      ] as ButtonColor[],
      description: "Button color scheme",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disabled state",
    },
    loading: {
      control: { type: "boolean" },
      description: "Loading state",
    },
    href: {
      control: { type: "text" },
      description: "Optional href for link behavior",
    },
    type: {
      control: { type: "radio" },
      options: ["button", "submit", "reset"] as ButtonType[],
      description: "Button type attribute",
    },
    icon: {
      control: { type: "text" },
      description: "Iconify icon name",
    },
    trailingIcon: {
      control: { type: "boolean" },
      description: "Place icon after text",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Full width button",
    },
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

const baseButtonData = {
  label: randPhrase(),
  href: randUrl(),
};

export const Outlined: Story = {
  name: "Outlined (Default)",
  args: {
    ...baseButtonData,
    variant: "outlined",
    size: "medium",
    color: "primary",
  },
};

export const Filled: Story = {
  name: "Filled",
  args: {
    ...baseButtonData,
    variant: "filled",
    size: "medium",
    color: "primary",
  },
};

export const Text: Story = {
  name: "Text",
  args: {
    ...baseButtonData,
    variant: "text",
    size: "medium",
    color: "primary",
  },
};

export const Elevated: Story = {
  name: "Elevated",
  args: {
    ...baseButtonData,
    variant: "elevated",
    size: "medium",
    color: "primary",
  },
};

export const Tonal: Story = {
  name: "Tonal",
  args: {
    ...baseButtonData,
    variant: "tonal",
    size: "medium",
    color: "primary",
  },
};

export const Sizes: Story = {
  name: "Size Variants",
  args: {
    ...baseButtonData,
    variant: "outlined",
    color: "primary",
  },
  render: (args) => {
    const container = document.createElement("div");
    container.className = "flex flex-wrap items-center gap-4 p-6";

    (["small", "medium", "large"] as ButtonSize[]).forEach((size) => {
      const button = document.createElement("wc-button");

      Object.entries(args).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          button.setAttribute(key, String(value));
        }
      });

      button.setAttribute("size", size);
      button.setAttribute("label", `${args.label} (${size})`);

      container.appendChild(button);
    });

    return container;
  },
};

export const Colors: Story = {
  name: "Color Variants",
  args: {
    ...baseButtonData,
    variant: "filled",
    size: "medium",
  },
  render: (args) => {
    const container = document.createElement("div");
    container.className = "flex flex-wrap items-center gap-4 p-6";

    (
      ["primary", "secondary", "error", "success", "warning"] as ButtonColor[]
    ).forEach((color) => {
      const button = document.createElement("wc-button");

      Object.entries(args).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          button.setAttribute(key, String(value));
        }
      });

      button.setAttribute("color", color);
      button.setAttribute(
        "label",
        `${color.charAt(0).toUpperCase() + color.slice(1)}`
      );

      container.appendChild(button);
    });

    return container;
  },
};

export const WithIcons: Story = {
  name: "With Icons",
  args: {
    ...baseButtonData,
    variant: "outlined",
    size: "medium",
    color: "primary",
  },
  render: (args) => {
    const container = document.createElement("div");
    container.className = "flex flex-wrap items-center gap-4 p-6";

    // Leading icon
    const leadingButton = document.createElement("wc-button");
    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        leadingButton.setAttribute(key, String(value));
      }
    });
    leadingButton.setAttribute("icon", "garden--arrow-left-stroke-16");
    leadingButton.setAttribute("label", "Back");
    container.appendChild(leadingButton);

    // Trailing icon
    const trailingButton = document.createElement("wc-button");
    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        trailingButton.setAttribute(key, String(value));
      }
    });
    trailingButton.setAttribute("icon", "garden--arrow-right-stroke-16");
    trailingButton.setAttribute("trailing-icon", "true");
    trailingButton.setAttribute("label", "Next");
    container.appendChild(trailingButton);

    // Icon only
    const iconButton = document.createElement("wc-button");
    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        iconButton.setAttribute(key, String(value));
      }
    });
    iconButton.setAttribute("icon", "garden--settings-stroke-16");
    iconButton.setAttribute("label", "");
    container.appendChild(iconButton);

    return container;
  },
};

export const States: Story = {
  name: "Button States",
  args: {
    ...baseButtonData,
    variant: "outlined",
    size: "medium",
    color: "primary",
  },
  render: (args) => {
    const container = document.createElement("div");
    container.className = "flex flex-wrap items-center gap-4 p-6";

    // Normal
    const normalButton = document.createElement("wc-button");
    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        normalButton.setAttribute(key, String(value));
      }
    });
    normalButton.setAttribute("label", "Normal");
    container.appendChild(normalButton);

    // Disabled
    const disabledButton = document.createElement("wc-button");
    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        disabledButton.setAttribute(key, String(value));
      }
    });
    disabledButton.setAttribute("label", "Disabled");
    disabledButton.setAttribute("disabled", "true");
    container.appendChild(disabledButton);

    // Loading
    const loadingButton = document.createElement("wc-button");
    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        loadingButton.setAttribute(key, String(value));
      }
    });
    loadingButton.setAttribute("label", "Loading");
    loadingButton.setAttribute("loading", "true");
    container.appendChild(loadingButton);

    return container;
  },
};

export const FullWidth: Story = {
  name: "Full Width",
  args: {
    ...baseButtonData,
    variant: "filled",
    size: "medium",
    color: "primary",
    fullWidth: true,
  },
  render: (args) => {
    const container = document.createElement("div");
    container.className = "space-y-4 p-6 max-w-md";

    const button = document.createElement("wc-button");
    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        button.setAttribute(key, String(value));
      }
    });

    container.appendChild(button);
    return container;
  },
};

export const AsLink: Story = {
  name: "As Link",
  args: {
    ...baseButtonData,
    variant: "outlined",
    size: "medium",
    color: "primary",
    href: "https://example.com",
  },
};

export const VariantShowcase: Story = {
  name: "Variant Showcase",
  render: () => {
    const container = document.createElement("div");
    container.className = "grid grid-cols-1 md:grid-cols-2 gap-6 p-6";

    const variants = [
      "filled",
      "outlined",
      "text",
      "elevated",
      "tonal",
    ] as ButtonVariant[];

    variants.forEach((variant) => {
      const button = document.createElement("wc-button");
      button.setAttribute(
        "label",
        `${variant.charAt(0).toUpperCase() + variant.slice(1)} Button`
      );
      button.setAttribute("variant", variant);
      button.setAttribute("size", "medium");
      button.setAttribute("color", "primary");

      container.appendChild(button);
    });

    return container;
  },
};

export const ColorVariantCombinations: Story = {
  name: "Color & Variant Combinations",
  render: () => {
    const container = document.createElement("div");
    container.className = "space-y-6 p-6";

    const variants = ["filled", "outlined", "text"] as ButtonVariant[];
    const colors = [
      "primary",
      "secondary",
      "error",
      "success",
      "warning",
    ] as ButtonColor[];

    variants.forEach((variant) => {
      const variantGroup = document.createElement("div");
      variantGroup.className = "space-y-4";

      const title = document.createElement("h3");
      title.className = "text-lg font-medium text-onSurface mb-2";
      title.textContent = `${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`;
      variantGroup.appendChild(title);

      const buttonGroup = document.createElement("div");
      buttonGroup.className = "flex flex-wrap gap-3";

      colors.forEach((color) => {
        const button = document.createElement("wc-button");
        button.setAttribute("label", color);
        button.setAttribute("variant", variant);
        button.setAttribute("size", "medium");
        button.setAttribute("color", color);

        buttonGroup.appendChild(button);
      });

      variantGroup.appendChild(buttonGroup);
      container.appendChild(variantGroup);
    });

    return container;
  },
};

export const Playground: Story = {
  name: "Playground",
  args: {
    label: "Customize me",
    variant: "outlined",
    size: "medium",
    color: "primary",
    disabled: false,
    loading: false,
    href: "",
    type: "button",
    icon: "garden--settings-stroke-16",
    trailingIcon: false,
    fullWidth: false,
  },
  parameters: {
    controls: {
      expanded: true,
      sort: "alpha",
    },
  },
};
