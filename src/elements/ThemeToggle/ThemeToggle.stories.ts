import type { Meta, StoryObj } from "@storybook/html";

const meta = {
  title: "Components/ThemeToggle",
  component: "wc-theme-toggle",
  tags: ["autodocs"],
  render: () => {
    return document.createElement("wc-theme-toggle");
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const InNavigation: Story = {
  render: () => {
    const nav = document.createElement("div");
    nav.className =
      "flex items-center justify-between p-4 bg-surfaceContainerHighest border border-outlineVariant rounded-lg";

    nav.innerHTML = `
      <div class="flex items-center gap-4">
        <wc-logo class="h-8 fill-primary"></wc-logo>
        <span class="text-xl font-bold text-onSurface">MyApp</span>
      </div>
      
      <div class="flex items-center gap-3">
        <button class="p-2 hover:bg-surfaceContainerLow rounded transition-colors">
          <span class="icon-[carbon--search] w-5 h-5 text-onSurfaceVariant"></span>
        </button>
        <wc-theme-toggle></wc-theme-toggle>
        <button class="px-4 py-2 bg-primary text-onPrimary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          Sign In
        </button>
      </div>
    `;

    return nav;
  },
};

export const WithLabels: Story = {
  render: () => {
    const container = document.createElement("div");
    container.className = "p-6 bg-background space-y-6";

    container.innerHTML = `
      <div class="flex items-center justify-between p-4 bg-surfaceContainerLow border border-outlineVariant rounded-lg">
        <div>
          <div class="font-medium text-onSurface">Interface Theme</div>
          <div class="text-sm text-onSurfaceVariant">Switch between light and dark mode</div>
        </div>
        <wc-theme-toggle></wc-theme-toggle>
      </div>
      
      <div class="flex items-center gap-4 p-4 bg-surfaceContainerLow border border-outlineVariant rounded-lg">
        <span class="text-onSurface font-medium">Light</span>
        <wc-theme-toggle></wc-theme-toggle>
        <span class="text-onSurface font-medium">Dark</span>
      </div>
    `;

    return container;
  },
};
