//src/stories/Sticky.stories.ts
import type { Meta, StoryObj } from "@storybook/html";
import { randMusicGenre, randUrl } from "@ngneat/falso";

const meta = {
  title: "Components/Sticky",
  component: "wc-sticky",
  tags: ["autodocs"],
  decorators: [
    (story) => {
      const container = document.createElement("div");
      container.className = "min-h-screen";

      // Add some content before sticky to demonstrate scroll behavior
      const beforeContent = document.createElement("div");
      beforeContent.className =
        "h-96 bg-gradient-to-b from-primary/20 to-secondary/20 flex items-center justify-center";
      beforeContent.innerHTML = `
        <div class="text-center">
          <h1 class="text-4xl font-bold text-onSurface mb-4">Scroll down to see sticky behavior</h1>
          <p class="text-onSurfaceVariant">The navigation will become sticky when you scroll past it</p>
        </div>
      `;

      const storyResult = story();

      // Add content after sticky to enable scrolling
      const afterContent = document.createElement("div");
      afterContent.className = "space-y-8 p-8";
      afterContent.innerHTML = `
        ${Array.from(
          { length: 10 },
          (_, i) => `
          <div class="bg-surface p-6 rounded-lg border border-outline/20">
            <h3 class="text-xl font-semibold text-onSurface mb-3">Section ${i + 1}</h3>
            <p class="text-onSurfaceVariant leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        `
        ).join("")}
      `;

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
    const sticky = document.createElement("wc-sticky");

    // Logo slot
    const logo = document.createElement("wc-logo");
    logo.slot = "logo";
    logo.className = "h-8";
    sticky.appendChild(logo);

    // Navigation slot - Contiene tanto desktop como mobile navigation
    const navigationContainer = document.createElement("div");
    navigationContainer.slot = "navigation";
    navigationContainer.className = "w-full flex justify-center";

    // Desktop navigation (visible solo en desktop)
    const desktopNav = document.createElement("nav");
    desktopNav.className = "hidden md:flex md:space-x-6";
    desktopNav.innerHTML = `
      <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow font-medium bg-primaryContainer text-onPrimaryContainer">Home</a>
      ${Array.from(
        { length: 4 },
        () => `
        <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow">
          ${randMusicGenre()}
        </a>
      `
      ).join("")}
    `;

    // Mobile navigation usando wc-offcanvas (visible solo en mobile)
    const offcanvas = document.createElement("wc-offcanvas");
    offcanvas.className = "md:hidden";

    const mobileNav = document.createElement("nav");
    mobileNav.className = "flex flex-col space-y-2 p-4";
    mobileNav.innerHTML = `
      <h2 class="text-xl font-medium text-onSurface mb-4">Navigation</h2>
      <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow font-medium bg-primaryContainer text-onPrimaryContainer">Home</a>
      ${Array.from(
        { length: 4 },
        () => `
        <a href="${randUrl()}" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow">
          ${randMusicGenre()}
        </a>
      `
      ).join("")}
    `;

    offcanvas.appendChild(mobileNav);
    navigationContainer.appendChild(desktopNav);
    navigationContainer.appendChild(offcanvas);
    sticky.appendChild(navigationContainer);

    // Actions slot
    const actions = document.createElement("div");
    actions.slot = "actions";
    actions.className = "flex items-center space-x-2";
    actions.innerHTML = `
      <button class="hidden md:flex items-center space-x-2 px-4 py-2 bg-primary text-onPrimary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
        <span>Sign In</span>
      </button>
      <button class="p-2 rounded-lg hover:bg-surfaceContainer transition-colors" title="Search">
        <svg class="w-5 h-5 text-onSurfaceVariant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
    `;
    sticky.appendChild(actions);

    return sticky;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const WithLongNavigation: Story = {
  render: () => {
    const sticky = document.createElement("wc-sticky");

    // Logo slot
    const logo = document.createElement("wc-logo");
    logo.slot = "logo";
    logo.className = "h-8";
    sticky.appendChild(logo);

    // Navigation slot con más elementos
    const navigationContainer = document.createElement("div");
    navigationContainer.slot = "navigation";
    navigationContainer.className = "w-full flex justify-center";

    // Desktop navigation
    const desktopNav = document.createElement("nav");
    desktopNav.className =
      "hidden md:flex md:space-x-4 md:flex-wrap md:justify-center";
    desktopNav.innerHTML = `
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow font-medium bg-primaryContainer text-onPrimaryContainer whitespace-nowrap">Home</a>
      ${Array.from(
        { length: 8 },
        () => `
        <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow whitespace-nowrap">
          ${randMusicGenre()}
        </a>
      `
      ).join("")}
    `;

    // Mobile navigation con offcanvas
    const offcanvas = document.createElement("wc-offcanvas");
    offcanvas.className = "md:hidden";

    const mobileNav = document.createElement("nav");
    mobileNav.className = "flex flex-col space-y-2 p-4";
    mobileNav.innerHTML = `
      <h2 class="text-xl font-medium text-onSurface mb-4">Navigation</h2>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow font-medium bg-primaryContainer text-onPrimaryContainer">Home</a>
      ${Array.from(
        { length: 8 },
        () => `
        <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow">
          ${randMusicGenre()}
        </a>
      `
      ).join("")}
    `;

    offcanvas.appendChild(mobileNav);
    navigationContainer.appendChild(desktopNav);
    navigationContainer.appendChild(offcanvas);
    sticky.appendChild(navigationContainer);

    // Actions slot
    const actions = document.createElement("div");
    actions.slot = "actions";
    actions.className = "flex items-center space-x-2";
    actions.innerHTML = `
      <button class="p-2 rounded-lg hover:bg-surfaceContainer transition-colors" title="Search">
        <svg class="w-5 h-5 text-onSurfaceVariant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
    `;
    sticky.appendChild(actions);

    return sticky;
  },
};

export const MinimalActions: Story = {
  render: () => {
    const sticky = document.createElement("wc-sticky");

    // Logo slot
    const logo = document.createElement("wc-logo");
    logo.slot = "logo";
    logo.className = "h-8";
    sticky.appendChild(logo);

    // Navigation slot
    const navigationContainer = document.createElement("div");
    navigationContainer.slot = "navigation";
    navigationContainer.className = "w-full flex justify-center";

    // Desktop navigation
    const desktopNav = document.createElement("nav");
    desktopNav.className = "hidden md:flex md:space-x-6";
    desktopNav.innerHTML = `
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow font-medium bg-primaryContainer text-onPrimaryContainer">Home</a>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow">About</a>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow">Services</a>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow">Contact</a>
    `;

    // Mobile navigation con offcanvas
    const offcanvas = document.createElement("wc-offcanvas");
    offcanvas.className = "md:hidden";

    const mobileNav = document.createElement("nav");
    mobileNav.className = "flex flex-col space-y-2 p-4";
    mobileNav.innerHTML = `
      <h2 class="text-xl font-medium text-onSurface mb-4">Menu</h2>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow font-medium bg-primaryContainer text-onPrimaryContainer">Home</a>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow">About</a>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow">Services</a>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow">Contact</a>
    `;

    offcanvas.appendChild(mobileNav);
    navigationContainer.appendChild(desktopNav);
    navigationContainer.appendChild(offcanvas);
    sticky.appendChild(navigationContainer);

    // Actions slot - solo búsqueda
    const actions = document.createElement("div");
    actions.slot = "actions";
    actions.className = "flex items-center";
    actions.innerHTML = `
      <button class="p-2 rounded-lg hover:bg-surfaceContainer transition-colors" title="Search">
        <svg class="w-5 h-5 text-onSurfaceVariant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </button>
    `;
    sticky.appendChild(actions);

    return sticky;
  },
};

export const NoActions: Story = {
  render: () => {
    const sticky = document.createElement("wc-sticky");

    // Logo slot
    const logo = document.createElement("wc-logo");
    logo.slot = "logo";
    logo.className = "h-8";
    sticky.appendChild(logo);

    // Navigation slot
    const navigationContainer = document.createElement("div");
    navigationContainer.slot = "navigation";
    navigationContainer.className = "w-full flex justify-center";

    // Desktop navigation
    const desktopNav = document.createElement("nav");
    desktopNav.className = "hidden md:flex md:space-x-6";
    desktopNav.innerHTML = `
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow font-medium bg-primaryContainer text-onPrimaryContainer">Home</a>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow">Products</a>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow">About</a>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow">Blog</a>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-surfaceContainerLow">Contact</a>
    `;

    // Mobile navigation con offcanvas
    const offcanvas = document.createElement("wc-offcanvas");
    offcanvas.className = "md:hidden";

    const mobileNav = document.createElement("nav");
    mobileNav.className = "flex flex-col space-y-2 p-4";
    mobileNav.innerHTML = `
      <h2 class="text-xl font-medium text-onSurface mb-4">Menu</h2>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow font-medium bg-primaryContainer text-onPrimaryContainer">Home</a>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow">Products</a>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow">About</a>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow">Blog</a>
      <a href="#" class="text-onSurface hover:text-primary transition-colors px-3 py-3 rounded-lg hover:bg-surfaceContainerLow">Contact</a>
    `;

    offcanvas.appendChild(mobileNav);
    navigationContainer.appendChild(desktopNav);
    navigationContainer.appendChild(offcanvas);
    sticky.appendChild(navigationContainer);

    // Sin slot actions

    return sticky;
  },
};
