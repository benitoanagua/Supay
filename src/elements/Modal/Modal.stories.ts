import type { Meta, StoryObj } from "@storybook/html";
import { randParagraph, randCatchPhrase, randPhrase } from "@ngneat/falso";

const meta = {
  title: "Components/Modal",
  component: "wc-modal",
  tags: ["autodocs"],
  render: () => {
    const modal = document.createElement("wc-modal");
    modal.setAttribute("open", "true");
    modal.setAttribute("title", "Default Modal");
    modal.setAttribute("size", "medium");

    // Add content to the modal
    const content = document.createElement("div");
    content.innerHTML = `
      <div class="space-y-4">
        <p class="text-onSurfaceVariant">${randParagraph()}</p>
        <div class="p-4 bg-surfaceContainerLow border-l-4 border-l-primary">
          <p class="text-onSurfaceVariant text-sm">${randParagraph().substring(0, 120)}</p>
        </div>
        <p class="text-onSurfaceVariant">${randParagraph().substring(0, 200)}</p>
      </div>
    `;

    // Add footer with actions
    const footer = document.createElement("div");
    footer.slot = "footer";
    footer.innerHTML = `
      <div class="flex items-center justify-end gap-3">
        <button class="px-4 py-2 border border-outline text-onSurface rounded-lg text-sm font-medium hover:bg-surfaceContainerLow transition-colors">
          Cancel
        </button>
        <button class="px-4 py-2 bg-primary text-onPrimary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          Confirm
        </button>
      </div>
    `;

    modal.appendChild(content);
    modal.appendChild(footer);

    return modal;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const SmallModal: Story = {
  render: () => {
    const modal = document.createElement("wc-modal");
    modal.setAttribute("open", "true");
    modal.setAttribute("title", "Small Modal");
    modal.setAttribute("size", "small");

    const content = document.createElement("div");
    content.innerHTML = `
      <div class="text-center space-y-4">
        <div class="w-16 h-16 bg-primaryContainer rounded-full flex items-center justify-center mx-auto">
          <span class="icon-[carbon--checkmark] w-8 h-8 text-onPrimaryContainer"></span>
        </div>
        <h3 class="text-lg font-medium text-onSurface">Action Completed</h3>
        <p class="text-onSurfaceVariant">${randParagraph().substring(0, 120)}</p>
      </div>
    `;

    const footer = document.createElement("div");
    footer.slot = "footer";
    footer.innerHTML = `
      <div class="flex justify-center">
        <button class="px-6 py-2 bg-primary text-onPrimary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          Got it!
        </button>
      </div>
    `;

    modal.appendChild(content);
    modal.appendChild(footer);

    return modal;
  },
};

export const LargeModal: Story = {
  render: () => {
    const modal = document.createElement("wc-modal");
    modal.setAttribute("open", "true");
    modal.setAttribute("title", "Large Information Modal");
    modal.setAttribute("size", "large");

    const content = document.createElement("div");
    content.innerHTML = `
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <h4 class="font-medium text-onSurface">Overview</h4>
            <p class="text-onSurfaceVariant text-sm">${randParagraph().substring(0, 150)}</p>
          </div>
          <div class="space-y-3">
            <h4 class="font-medium text-onSurface">Details</h4>
            <p class="text-onSurfaceVariant text-sm">${randParagraph().substring(0, 150)}</p>
          </div>
        </div>
        
        <div class="border-t border-outlineVariant pt-4">
          <h4 class="font-medium text-onSurface mb-3">Additional Information</h4>
          <div class="space-y-2">
            ${Array.from(
              { length: 3 },
              () => `
              <div class="flex items-center gap-3 py-2">
                <span class="w-2 h-2 bg-primary rounded-full"></span>
                <span class="text-onSurfaceVariant text-sm">${randPhrase()}</span>
              </div>
            `
            ).join("")}
          </div>
        </div>
        
        <div class="p-4 bg-surfaceContainerLow rounded-lg border border-outlineVariant">
          <p class="text-onSurfaceVariant text-sm">${randParagraph().substring(0, 180)}</p>
        </div>
      </div>
    `;

    const footer = document.createElement("div");
    footer.slot = "footer";
    footer.innerHTML = `
      <div class="flex items-center justify-between">
        <button class="text-primary text-sm font-medium hover:text-primary/80 transition-colors">
          Learn More
        </button>
        <div class="flex items-center gap-3">
          <button class="px-4 py-2 border border-outline text-onSurface rounded-lg text-sm font-medium hover:bg-surfaceContainerLow transition-colors">
            Back
          </button>
          <button class="px-4 py-2 bg-primary text-onPrimary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Continue
          </button>
        </div>
      </div>
    `;

    modal.appendChild(content);
    modal.appendChild(footer);

    return modal;
  },
};

export const MinimalModal: Story = {
  render: () => {
    const modal = document.createElement("wc-modal");
    modal.setAttribute("open", "true");
    modal.setAttribute("variant", "minimal");
    modal.setAttribute("show-close", "false");

    // Use slot for header instead of title attribute
    const header = document.createElement("div");
    header.slot = "header";
    header.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="icon-[carbon--warning] w-6 h-6 text-yellow-500"></span>
        <h2 class="text-xl font-semibold text-onSurface">Important Notice</h2>
      </div>
    `;

    const content = document.createElement("div");
    content.innerHTML = `
      <div class="space-y-4">
        <p class="text-onSurfaceVariant">${randParagraph()}</p>
        <div class="p-4 bg-yellowContainer border border-yellow-200 rounded-lg">
          <p class="text-onYellowContainer text-sm">${randCatchPhrase()}</p>
        </div>
      </div>
    `;

    const footer = document.createElement("div");
    footer.slot = "footer";
    footer.innerHTML = `
      <div class="flex items-center justify-center gap-3">
        <button class="px-6 py-2 bg-primary text-onPrimary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          I Understand
        </button>
      </div>
    `;

    modal.appendChild(header);
    modal.appendChild(content);
    modal.appendChild(footer);

    return modal;
  },
};

export const BorderedModal: Story = {
  render: () => {
    const modal = document.createElement("wc-modal");
    modal.setAttribute("open", "true");
    modal.setAttribute("title", "Bordered Style");
    modal.setAttribute("variant", "bordered");
    modal.setAttribute("size", "small");

    const content = document.createElement("div");
    content.innerHTML = `
      <div class="text-center space-y-4">
        <div class="w-12 h-12 bg-greenContainer rounded-full flex items-center justify-center mx-auto">
          <span class="icon-[carbon--checkmark] w-6 h-6 text-onGreenContainer"></span>
        </div>
        <h3 class="text-lg font-medium text-onSurface">Success!</h3>
        <p class="text-onSurfaceVariant text-sm">Your action has been completed successfully.</p>
      </div>
    `;

    const footer = document.createElement("div");
    footer.slot = "footer";
    footer.innerHTML = `
      <div class="flex justify-center">
        <button class="px-6 py-2 bg-green text-onGreen rounded-lg text-sm font-medium hover:bg-green/90 transition-colors">
          Continue
        </button>
      </div>
    `;

    modal.appendChild(content);
    modal.appendChild(footer);

    return modal;
  },
};

export const GlassModal: Story = {
  render: () => {
    const modal = document.createElement("wc-modal");
    modal.setAttribute("open", "true");
    modal.setAttribute("title", "Glass Effect");
    modal.setAttribute("variant", "glass");

    const content = document.createElement("div");
    content.innerHTML = `
      <div class="space-y-4">
        <p class="text-onSurfaceVariant">${randParagraph()}</p>
        <div class="grid grid-cols-2 gap-4">
          ${Array.from(
            { length: 4 },
            (_, i) => `
            <div class="p-3 bg-surfaceContainerLow/50 rounded-lg border border-outlineVariant/50 text-center">
              <div class="text-2xl font-bold text-primary mb-1">${i + 1}</div>
              <div class="text-xs text-onSurfaceVariant">Option</div>
            </div>
          `
          ).join("")}
        </div>
      </div>
    `;

    const footer = document.createElement("div");
    footer.slot = "footer";
    footer.innerHTML = `
      <div class="flex items-center justify-end gap-3">
        <button class="px-4 py-2 border border-outline/50 text-onSurface rounded-lg text-sm font-medium hover:bg-surfaceContainerLow/50 transition-colors">
          Skip
        </button>
        <button class="px-4 py-2 bg-primary/80 text-onPrimary rounded-lg text-sm font-medium hover:bg-primary transition-colors">
          Next
        </button>
      </div>
    `;

    modal.appendChild(content);
    modal.appendChild(footer);

    return modal;
  },
};

export const FullScreenModal: Story = {
  render: () => {
    const modal = document.createElement("wc-modal");
    modal.setAttribute("open", "true");
    modal.setAttribute("title", "Full Screen Modal");
    modal.setAttribute("size", "full");

    const content = document.createElement("div");
    content.innerHTML = `
      <div class="space-y-6">
        <div class="p-6 bg-surfaceContainerLow rounded-lg">
          <h3 class="text-lg font-medium text-onSurface mb-3">Full Screen Content</h3>
          <p class="text-onSurfaceVariant">${randParagraph()}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${Array.from(
            { length: 6 },
            (_, i) => `
            <div class="p-4 bg-surfaceContainerHigh border border-outlineVariant rounded-lg">
              <div class="text-2xl font-bold text-primary mb-2">${i + 1}</div>
              <p class="text-onSurfaceVariant text-sm">${randPhrase()}</p>
            </div>
          `
          ).join("")}
        </div>
        
        <div class="border-t border-outlineVariant pt-4">
          <p class="text-onSurfaceVariant">${randParagraph().substring(0, 200)}</p>
        </div>
      </div>
    `;

    const footer = document.createElement("div");
    footer.slot = "footer";
    footer.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-onSurfaceVariant text-sm">Full screen modal example</span>
        <div class="flex items-center gap-3">
          <button class="px-4 py-2 border border-outline text-onSurface rounded-lg text-sm font-medium hover:bg-surfaceContainerLow transition-colors">
            Cancel
          </button>
          <button class="px-4 py-2 bg-primary text-onPrimary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    `;

    modal.appendChild(content);
    modal.appendChild(footer);

    return modal;
  },
};

export const NoFooterModal: Story = {
  render: () => {
    const modal = document.createElement("wc-modal");
    modal.setAttribute("open", "true");
    modal.setAttribute("title", "Simple Message");
    modal.setAttribute("size", "small");

    const content = document.createElement("div");
    content.innerHTML = `
      <div class="text-center space-y-4">
        <p class="text-onSurfaceVariant">${randParagraph().substring(0, 150)}</p>
        <div class="pt-4 border-t border-outlineVariant">
          <button class="px-6 py-2 bg-primary text-onPrimary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Close
          </button>
        </div>
      </div>
    `;

    modal.appendChild(content);

    return modal;
  },
};

export const ErrorModal: Story = {
  render: () => {
    const modal = document.createElement("wc-modal");
    modal.setAttribute("open", "true");
    modal.setAttribute("title", "Error Occurred");
    modal.setAttribute("variant", "accent-top");

    // Add custom styles for error state
    const style = document.createElement("style");
    style.textContent = `
      wc-modal {
        --border-color: theme(colors.error.DEFAULT);
      }
    `;

    const content = document.createElement("div");
    content.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center gap-3 p-4 bg-errorContainer rounded-lg">
          <span class="icon-[carbon--error] w-6 h-6 text-onErrorContainer"></span>
          <div>
            <h4 class="font-medium text-onErrorContainer">Unable to complete action</h4>
            <p class="text-onErrorContainer text-sm mt-1">${randPhrase()}</p>
          </div>
        </div>
        <p class="text-onSurfaceVariant">${randParagraph().substring(0, 180)}</p>
      </div>
    `;

    const footer = document.createElement("div");
    footer.slot = "footer";
    footer.innerHTML = `
      <div class="flex items-center justify-end gap-3">
        <button class="px-4 py-2 border border-outline text-onSurface rounded-lg text-sm font-medium hover:bg-surfaceContainerLow transition-colors">
          Cancel
        </button>
        <button class="px-4 py-2 bg-error text-onError rounded-lg text-sm font-medium hover:bg-error/90 transition-colors">
          Try Again
        </button>
      </div>
    `;

    modal.appendChild(style);
    modal.appendChild(content);
    modal.appendChild(footer);

    return modal;
  },
};
