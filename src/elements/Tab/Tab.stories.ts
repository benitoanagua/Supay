import type { Meta, StoryObj } from "@storybook/html";
import { randSentence, randMusicGenre } from "@ngneat/falso";

const meta = {
  title: "Components/Tabs",
  component: "wc-tabs",
  tags: ["autodocs"],
  render: () => {
    const tabs = document.createElement("wc-tabs");
    tabs.setAttribute("active-tab", "0");

    // Tab 1
    const tab1 = document.createElement("wc-tab");
    tab1.slot = "tabs";
    tab1.setAttribute("active", "true");
    tab1.innerHTML = `
      <span class="icon-[carbon--home] w-5 h-5"></span>
      <span>Home</span>
    `;

    // Tab 2
    const tab2 = document.createElement("wc-tab");
    tab2.slot = "tabs";
    tab2.innerHTML = `
      <span class="icon-[carbon--settings] w-5 h-5"></span>
      <span>Settings</span>
    `;

    // Tab 3
    const tab3 = document.createElement("wc-tab");
    tab3.slot = "tabs";
    tab3.innerHTML = `
      <span class="icon-[carbon--help] w-5 h-5"></span>
      <span>Help</span>
    `;

    // Panel 1
    const panel1 = document.createElement("wc-tab-panel");
    panel1.slot = "panels";
    panel1.setAttribute("active", "true");
    panel1.innerHTML = `
      <div class="p-6">
        <h3 class="text-lg font-medium text-onSurface mb-3">Home Dashboard</h3>
        <p class="text-onSurfaceVariant">${randSentence()}</p>
        <div class="mt-4 p-4 bg-primaryContainer border-l-4 border-primary">
          <p class="text-onPrimaryContainer text-sm">${randSentence()}</p>
        </div>
      </div>
    `;

    // Panel 2
    const panel2 = document.createElement("wc-tab-panel");
    panel2.slot = "panels";
    panel2.innerHTML = `
      <div class="p-6">
        <h3 class="text-lg font-medium text-onSurface mb-3">Settings Panel</h3>
        <p class="text-onSurfaceVariant">${randSentence()}</p>
        <ul class="mt-3 space-y-2">
          ${Array.from(
            { length: 3 },
            () => `
            <li class="flex items-center gap-2 text-onSurfaceVariant">
              <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>
              <span>${randMusicGenre()}</span>
            </li>
          `
          ).join("")}
        </ul>
      </div>
    `;

    // Panel 3
    const panel3 = document.createElement("wc-tab-panel");
    panel3.slot = "panels";
    panel3.innerHTML = `
      <div class="p-6">
        <h3 class="text-lg font-medium text-onSurface mb-3">Help & Support</h3>
        <p class="text-onSurfaceVariant">${randSentence()}</p>
        <div class="mt-4 flex gap-3">
          <button class="px-4 py-2 bg-primary text-onPrimary rounded-lg text-sm">Contact Support</button>
          <button class="px-4 py-2 border border-outline text-onSurface rounded-lg text-sm">Documentation</button>
        </div>
      </div>
    `;

    tabs.appendChild(tab1);
    tabs.appendChild(tab2);
    tabs.appendChild(tab3);
    tabs.appendChild(panel1);
    tabs.appendChild(panel2);
    tabs.appendChild(panel3);

    return tabs;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const TextOnly: Story = {
  render: () => {
    const tabs = document.createElement("wc-tabs");
    tabs.setAttribute("active-tab", "1");

    const tabNames = ["Overview", "Features", "Documentation", "Pricing"];

    tabNames.forEach((name, index) => {
      const tab = document.createElement("wc-tab");
      tab.slot = "tabs";
      if (index === 1) tab.setAttribute("active", "true");
      tab.textContent = name;

      const panel = document.createElement("wc-tab-panel");
      panel.slot = "panels";
      if (index === 1) panel.setAttribute("active", "true");
      panel.innerHTML = `
        <div class="p-6">
          <h3 class="text-lg font-medium text-onSurface mb-3">${name} Content</h3>
          <p class="text-onSurfaceVariant">${randSentence()}</p>
        </div>
      `;

      tabs.appendChild(tab);
      tabs.appendChild(panel);
    });

    return tabs;
  },
};

export const WithBadges: Story = {
  render: () => {
    const tabs = document.createElement("wc-tabs");
    tabs.setAttribute("active-tab", "0");

    const tabData = [
      { name: "Inbox", badge: "5", icon: "carbon--inbox" },
      { name: "Sent", badge: "", icon: "carbon--send-alt" },
      { name: "Drafts", badge: "2", icon: "carbon--document" },
      { name: "Spam", badge: "12", icon: "carbon--warning" },
    ];

    tabData.forEach((item, index) => {
      const tab = document.createElement("wc-tab");
      tab.slot = "tabs";
      if (index === 0) tab.setAttribute("active", "true");
      tab.innerHTML = `
        <span class="icon-[${item.icon}] w-5 h-5"></span>
        <span>${item.name}</span>
        ${item.badge ? `<span class="ml-2 px-2 py-1 bg-primary text-onPrimary text-xs rounded-full">${item.badge}</span>` : ""}
      `;

      const panel = document.createElement("wc-tab-panel");
      panel.slot = "panels";
      if (index === 0) panel.setAttribute("active", "true");
      panel.innerHTML = `
        <div class="p-6">
          <h3 class="text-lg font-medium text-onSurface mb-3">${item.name}</h3>
          <p class="text-onSurfaceVariant">${randSentence()}</p>
          ${item.badge ? `<div class="mt-3 text-sm text-primary">You have ${item.badge} unread items</div>` : ""}
        </div>
      `;

      tabs.appendChild(tab);
      tabs.appendChild(panel);
    });

    return tabs;
  },
};

export const DisabledTabs: Story = {
  render: () => {
    const tabs = document.createElement("wc-tabs");
    tabs.setAttribute("active-tab", "0");
    tabs.setAttribute("disabled", "true");

    const tab1 = document.createElement("wc-tab");
    tab1.slot = "tabs";
    tab1.setAttribute("active", "true");
    tab1.innerHTML = `<span>Active Tab</span>`;

    const tab2 = document.createElement("wc-tab");
    tab2.slot = "tabs";
    tab2.setAttribute("disabled", "true");
    tab2.innerHTML = `<span>Disabled Tab</span>`;

    const panel1 = document.createElement("wc-tab-panel");
    panel1.slot = "panels";
    panel1.setAttribute("active", "true");
    panel1.innerHTML = `
      <div class="p-6">
        <h3 class="text-lg font-medium text-onSurface mb-3">Active Panel</h3>
        <p class="text-onSurfaceVariant">This is the active panel content.</p>
      </div>
    `;

    const panel2 = document.createElement("wc-tab-panel");
    panel2.slot = "panels";
    panel2.innerHTML = `
      <div class="p-6">
        <h3 class="text-lg font-medium text-onSurface mb-3">Disabled Panel</h3>
        <p class="text-onSurfaceVariant">This panel is not accessible.</p>
      </div>
    `;

    tabs.appendChild(tab1);
    tabs.appendChild(tab2);
    tabs.appendChild(panel1);
    tabs.appendChild(panel2);

    return tabs;
  },
};
