import type { Meta, StoryObj } from "@storybook/html";
import { randMusicGenre, randUrl, randPhrase } from "@ngneat/falso";

const meta = {
  title: "Components/Navbar",
  component: "wc-navbar",
  tags: ["autodocs"],
  decorators: [
    (story) => {
      const container = document.createElement("div");
      container.className = "min-h-screen";

      const beforeContent = document.createElement("div");
      beforeContent.className =
        "h-96 bg-gradient-to-b from-primary/20 to-secondary/20 flex items-center justify-center";
      beforeContent.innerHTML = `
        <div class="text-center">
          <h1 class="text-4xl font-bold text-onSurface mb-4">${randPhrase()}</h1>
          <p class="text-onSurfaceVariant">${randPhrase()}</p>
        </div>
      `;

      const storyResult = story();

      const afterContent = document.createElement("div");
      afterContent.className = "space-y-8 p-8";
      afterContent.innerHTML = Array.from(
        { length: 10 },
        (_, i) => `
          <div class="bg-surface p-6 rounded-lg border border-outline/20">
            <h3 class="text-xl font-semibold text-onSurface mb-3">${randPhrase()}</h3>
            <p class="text-onSurfaceVariant leading-relaxed">${randPhrase()}</p>
          </div>
        `
      ).join("");

      container.appendChild(beforeContent);
      if (typeof storyResult === "string") {
        container.innerHTML += storyResult;
      } else {
        container.appendChild(storyResult);
      }
      container.appendChild(afterContent);
      return container;
    },
  ],
  render: () => {
    const navbar = document.createElement("wc-navbar");

    const logo = document.createElement("wc-logo");
    logo.slot = "logo";
    logo.className = "h-8";
    navbar.appendChild(logo);

    const navigationContainer = document.createElement("div");
    navigationContainer.slot = "navigation";
    navigationContainer.className = "w-full flex justify-center";

    const desktopNav = document.createElement("nav");
    desktopNav.className = "hidden md:flex md:space-x-6";
    desktopNav.innerHTML = `
      <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow font-medium bg-primaryContainer text-onPrimaryContainer">${randMusicGenre()}</a>
      ${Array.from(
        { length: 4 },
        () => `
        <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow">${randMusicGenre()}</a>
      `
      ).join("")}
    `;

    const offcanvas = document.createElement("wc-offcanvas");
    offcanvas.className = "md:hidden";

    const mobileNav = document.createElement("nav");
    mobileNav.className = "flex flex-col space-y-2 p-4";
    mobileNav.innerHTML = `
      <h2 class="text-xl font-medium text-onSurface mb-4">${randMusicGenre()}</h2>
      ${Array.from(
        { length: 5 },
        () => `
        <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow">${randMusicGenre()}</a>
      `
      ).join("")}
    `;

    offcanvas.appendChild(mobileNav);
    navigationContainer.appendChild(desktopNav);
    navigationContainer.appendChild(offcanvas);
    navbar.appendChild(navigationContainer);

    const actions = document.createElement("div");
    actions.slot = "actions";
    actions.className = "flex items-center space-x-2";
    actions.innerHTML = `
      <button class="hidden md:flex items-center space-x-2 px-4 py-2 bg-primary text-onPrimary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
        <span>${randMusicGenre()}</span>
      </button>
      <button class="p-2 rounded-lg hover:bg-surfaceContainer transition-colors" title="${randMusicGenre()}">
        <svg class="w-5 h-5 text-onSurfaceVariant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
    `;
    navbar.appendChild(actions);

    return navbar;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithLongNavigation: Story = {
  render: () => {
    const navbar = document.createElement("wc-navbar");

    const logo = document.createElement("wc-logo");
    logo.slot = "logo";
    logo.className = "h-8";
    navbar.appendChild(logo);

    const navigationContainer = document.createElement("div");
    navigationContainer.slot = "navigation";
    navigationContainer.className = "w-full flex justify-center";

    const desktopNav = document.createElement("nav");
    desktopNav.className =
      "hidden md:flex md:space-x-4 md:flex-wrap md:justify-center";
    desktopNav.innerHTML = Array.from(
      { length: 8 },
      () => `
      <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow whitespace-nowrap">${randMusicGenre()}</a>
    `
    ).join("");

    const offcanvas = document.createElement("wc-offcanvas");
    offcanvas.className = "md:hidden";

    const mobileNav = document.createElement("nav");
    mobileNav.className = "flex flex-col space-y-2 p-4";
    mobileNav.innerHTML = Array.from(
      { length: 8 },
      () => `
      <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow">${randMusicGenre()}</a>
    `
    ).join("");

    offcanvas.appendChild(mobileNav);
    navigationContainer.appendChild(desktopNav);
    navigationContainer.appendChild(offcanvas);
    navbar.appendChild(navigationContainer);

    const actions = document.createElement("div");
    actions.slot = "actions";
    actions.className = "flex items-center space-x-2";
    actions.innerHTML = `
      <button class="p-2 rounded-lg hover:bg-surfaceContainer transition-colors" title="${randMusicGenre()}">
        <svg class="w-5 h-5 text-onSurfaceVariant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
    `;
    navbar.appendChild(actions);

    return navbar;
  },
};

export const MinimalActions: Story = {
  render: () => {
    const navbar = document.createElement("wc-navbar");

    const logo = document.createElement("wc-logo");
    logo.slot = "logo";
    logo.className = "h-8";
    navbar.appendChild(logo);

    const navigationContainer = document.createElement("div");
    navigationContainer.slot = "navigation";
    navigationContainer.className = "w-full flex justify-center";

    const desktopNav = document.createElement("nav");
    desktopNav.className = "hidden md:flex md:space-x-6";
    desktopNav.innerHTML = Array.from(
      { length: 4 },
      () => `
      <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow">${randMusicGenre()}</a>
    `
    ).join("");

    const offcanvas = document.createElement("wc-offcanvas");
    offcanvas.className = "md:hidden";

    const mobileNav = document.createElement("nav");
    mobileNav.className = "flex flex-col space-y-2 p-4";
    mobileNav.innerHTML = Array.from(
      { length: 4 },
      () => `
      <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow">${randMusicGenre()}</a>
    `
    ).join("");

    offcanvas.appendChild(mobileNav);
    navigationContainer.appendChild(desktopNav);
    navigationContainer.appendChild(offcanvas);
    navbar.appendChild(navigationContainer);

    const actions = document.createElement("div");
    actions.slot = "actions";
    actions.className = "flex items-center";
    actions.innerHTML = `
      <button class="p-2 rounded-lg hover:bg-surfaceContainer transition-colors" title="${randMusicGenre()}">
        <svg class="w-5 h-5 text-onSurfaceVariant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
    `;
    navbar.appendChild(actions);

    return navbar;
  },
};

export const NoActions: Story = {
  render: () => {
    const navbar = document.createElement("wc-navbar");

    const logo = document.createElement("wc-logo");
    logo.slot = "logo";
    logo.className = "h-8";
    navbar.appendChild(logo);

    const navigationContainer = document.createElement("div");
    navigationContainer.slot = "navigation";
    navigationContainer.className = "w-full flex justify-center";

    const desktopNav = document.createElement("nav");
    desktopNav.className = "hidden md:flex md:space-x-6";
    desktopNav.innerHTML = Array.from(
      { length: 5 },
      () => `
      <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow">${randMusicGenre()}</a>
    `
    ).join("");

    const offcanvas = document.createElement("wc-offcanvas");
    offcanvas.className = "md:hidden";

    const mobileNav = document.createElement("nav");
    mobileNav.className = "flex flex-col space-y-2 p-4";
    mobileNav.innerHTML = Array.from(
      { length: 5 },
      () => `
      <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow">${randMusicGenre()}</a>
    `
    ).join("");

    offcanvas.appendChild(mobileNav);
    navigationContainer.appendChild(desktopNav);
    navigationContainer.appendChild(offcanvas);
    navbar.appendChild(navigationContainer);

    return navbar;
  },
};
