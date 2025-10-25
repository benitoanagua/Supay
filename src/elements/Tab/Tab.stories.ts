import type { Meta, StoryObj } from "@storybook/html";
import { randSentence } from "@ngneat/falso";

interface TabsProps {
  activeTab?: number;
  disabled?: boolean;
}

const meta = {
  title: "Components/Tabs",
  component: "wc-tabs",
  tags: ["autodocs"],
  argTypes: {
    activeTab: { control: { type: "range", min: 0, max: 2, step: 1 } },
    disabled: { control: "boolean" },
  },
  render: (args: TabsProps) => {
    const tabs = document.createElement("wc-tabs");

    if (args.activeTab !== undefined)
      tabs.setAttribute("active-tab", args.activeTab.toString());
    if (args.disabled) tabs.setAttribute("disabled", "true");

    const tabNames = ["Structure", "Hierarchy", "Layout"];
    tabNames.forEach((name, index) => {
      const tab = document.createElement("wc-tab");
      tab.slot = "tabs";
      if (index === args.activeTab) tab.setAttribute("active", "true");
      tab.textContent = name;

      const panel = document.createElement("wc-tab-panel");
      panel.slot = "panels";
      if (index === args.activeTab) panel.setAttribute("active", "true");
      panel.innerHTML = `
        <div class="p-6">
          <h3 class="text-lg font-medium text-onSurface mb-3">${name}</h3>
          <p class="text-onSurfaceVariant">${randSentence()}</p>
        </div>
      `;

      tabs.appendChild(tab);
      tabs.appendChild(panel);
    });

    return tabs;
  },
} satisfies Meta<TabsProps>;

export default meta;
type Story = StoryObj<TabsProps>;

export const Structural: Story = {
  args: {
    activeTab: 0,
  },
};

export const Playground: Story = {
  args: {
    activeTab: 0,
    disabled: false,
  },
  parameters: {
    controls: { expanded: true },
  },
};
