import type { Meta, StoryObj } from "@storybook/html";
import { randUrl, randMusicGenre, randCompanyName } from "@ngneat/falso";

interface StickyProps {
  sticky: boolean;
}

const meta = {
  title: "Components/Sticky",
  component: "wc-sticky",
  tags: ["autodocs"],
  argTypes: {
    sticky: {
      control: { type: "boolean" },
      description: "Enable sticky behavior on scroll",
    },
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sticky navigation component with three slots: logo (left/center), navigation (center/offcanvas), and actions (right/left).",
      },
    },
  },
  render: (args: StickyProps) => {
    // Create main container for story
    const container = document.createElement("div");
    container.className = "min-h-screen bg-background";

    // Create sticky navigation
    const sticky = document.createElement("wc-sticky");
    if (!args.sticky) {
      sticky.removeAttribute("sticky");
    }

    // Slot: Logo
    const logoSlot = document.createElement("wc-logo");
    logoSlot.setAttribute("slot", "logo");
    logoSlot.setAttribute("size", "medium");
    sticky.appendChild(logoSlot);

    // Slot: Navigation
    const navSlot = document.createElement("wc-menu");
    navSlot.setAttribute("slot", "navigation");

    // Generate random menu items
    const menuItems = Array.from({ length: 5 }, (_, index) => ({
      title: index === 0 ? "Home" : randMusicGenre(),
      url: index === 0 ? "/" : randUrl(),
      active: index === 0,
    }));

    menuItems.forEach((item) => {
      const menuItem = document.createElement("wc-menu-item");
      menuItem.setAttribute("url", item.url);
      menuItem.setAttribute("title", item.title);
      if (item.active) {
        menuItem.setAttribute("active", "true");
      }
      navSlot.appendChild(menuItem);
    });

    sticky.appendChild(navSlot);

    // Slot: Actions
    const actionsSlot = document.createElement("div");
    actionsSlot.setAttribute("slot", "actions");

    // Search button (visible in both desktop and mobile)
    const searchButton = document.createElement("button");
    searchButton.className = "wc-sticky__search-button";
    searchButton.innerHTML = '<span class="wc-sticky__search-icon"></span>';
    searchButton.setAttribute("aria-label", "Search");

    // Sign In button (visible only on desktop)
    const signInButton = document.createElement("button");
    signInButton.className =
      "px-4 py-2 bg-primary text-onPrimary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors md:block hidden";
    signInButton.textContent = "Sign In";

    actionsSlot.appendChild(searchButton);
    actionsSlot.appendChild(signInButton);
    sticky.appendChild(actionsSlot);

    // Add navigation to container
    container.appendChild(sticky);

    // Add content sections to test sticky behavior
    const heroSection = document.createElement("section");
    heroSection.className =
      "h-screen bg-primaryContainer flex items-center justify-center";
    const heroTitle = document.createElement("h1");
    heroTitle.className =
      "text-4xl font-bold text-onPrimaryContainer text-center max-w-3xl px-4";
    heroTitle.textContent =
      "Scroll down to see the sticky navigation in action";
    heroSection.appendChild(heroTitle);
    container.appendChild(heroSection);

    // Add more content sections
    const sections = [
      {
        bg: "secondaryContainer",
        text: "onSecondaryContainer",
        title: "Content Section 1",
      },
      {
        bg: "tertiaryContainer",
        text: "onTertiaryContainer",
        title: "Content Section 2",
      },
      {
        bg: "surfaceContainer",
        text: "onSurface",
        title: "Content Section 3",
      },
      {
        bg: "primaryContainer",
        text: "onPrimaryContainer",
        title: "Content Section 4",
      },
    ];

    sections.forEach((section) => {
      const sectionEl = document.createElement("section");
      sectionEl.className = `h-screen bg-${section.bg} flex items-center justify-center`;
      const title = document.createElement("h2");
      title.className = `text-3xl font-bold text-${section.text}`;
      title.textContent = `${section.title}`;
      sectionEl.appendChild(title);
      container.appendChild(sectionEl);
    });

    return container;
  },
} satisfies Meta<StickyProps>;

export default meta;
type Story = StoryObj<StickyProps>;

export const Default: Story = {
  args: {
    sticky: true,
  },
};

export const NonSticky: Story = {
  name: "Non-Sticky",
  args: {
    sticky: false,
  },
};

export const WithCustomLogo: Story = {
  name: "With Custom Logo",
  args: {
    sticky: true,
  },
  render: (args) => {
    const container = document.createElement("div");
    container.className = "min-h-screen bg-background";

    const sticky = document.createElement("wc-sticky");
    if (!args.sticky) {
      sticky.removeAttribute("sticky");
    }

    // Custom logo with text
    const logoSlot = document.createElement("div");
    logoSlot.setAttribute("slot", "logo");
    logoSlot.className = "text-xl font-bold text-primary";
    logoSlot.textContent = randCompanyName();
    sticky.appendChild(logoSlot);

    // Navigation
    const navSlot = document.createElement("wc-menu");
    navSlot.setAttribute("slot", "navigation");

    ["Home", "Products", "Services", "About", "Contact"].forEach(
      (title, index) => {
        const menuItem = document.createElement("wc-menu-item");
        menuItem.setAttribute(
          "url",
          index === 0 ? "/" : `/${title.toLowerCase()}`
        );
        menuItem.setAttribute("title", title);
        if (index === 0) {
          menuItem.setAttribute("active", "true");
        }
        navSlot.appendChild(menuItem);
      }
    );

    sticky.appendChild(navSlot);

    // Actions
    const actionsSlot = document.createElement("div");
    actionsSlot.setAttribute("slot", "actions");

    const searchButton = document.createElement("button");
    searchButton.className = "wc-sticky__search-button";
    searchButton.innerHTML = '<span class="wc-sticky__search-icon"></span>';
    searchButton.setAttribute("aria-label", "Search");

    const demoButton = document.createElement("button");
    demoButton.className =
      "px-3 py-1.5 bg-secondary text-onSecondary rounded text-sm font-medium hover:bg-secondary/90 transition-colors md:block hidden";
    demoButton.textContent = "Free Demo";

    actionsSlot.appendChild(searchButton);
    actionsSlot.appendChild(demoButton);
    sticky.appendChild(actionsSlot);

    container.appendChild(sticky);

    // Content
    const contentSection = document.createElement("section");
    contentSection.className =
      "h-screen bg-surfaceContainer flex items-center justify-center";
    const title = document.createElement("h2");
    title.className = "text-2xl font-medium text-onSurface";
    title.textContent = "Sticky Navigation with Custom Logo";
    contentSection.appendChild(title);
    container.appendChild(contentSection);

    return container;
  },
};

export const MinimalActions: Story = {
  name: "Minimal Actions",
  args: {
    sticky: true,
  },
  render: (args) => {
    const container = document.createElement("div");
    container.className = "min-h-screen bg-background";

    const sticky = document.createElement("wc-sticky");
    if (!args.sticky) {
      sticky.removeAttribute("sticky");
    }

    // Logo
    const logoSlot = document.createElement("wc-logo");
    logoSlot.setAttribute("slot", "logo");
    logoSlot.setAttribute("size", "small");
    sticky.appendChild(logoSlot);

    // Navigation
    const navSlot = document.createElement("wc-menu");
    navSlot.setAttribute("slot", "navigation");

    ["Home", "Blog", "Contact"].forEach((title, index) => {
      const menuItem = document.createElement("wc-menu-item");
      menuItem.setAttribute(
        "url",
        index === 0 ? "/" : `/${title.toLowerCase()}`
      );
      menuItem.setAttribute("title", title);
      if (index === 0) {
        menuItem.setAttribute("active", "true");
      }
      navSlot.appendChild(menuItem);
    });

    sticky.appendChild(navSlot);

    // Minimal actions - only search button
    const actionsSlot = document.createElement("div");
    actionsSlot.setAttribute("slot", "actions");

    const searchButton = document.createElement("button");
    searchButton.className = "wc-sticky__search-button";
    searchButton.innerHTML = '<span class="wc-sticky__search-icon"></span>';
    searchButton.setAttribute("aria-label", "Search");

    actionsSlot.appendChild(searchButton);
    sticky.appendChild(actionsSlot);

    container.appendChild(sticky);

    // Content
    const contentSection = document.createElement("section");
    contentSection.className =
      "h-screen bg-surfaceContainerLow flex items-center justify-center";
    const title = document.createElement("h2");
    title.className = "text-2xl font-medium text-onSurface";
    title.textContent = "Minimal Sticky Navigation";
    contentSection.appendChild(title);
    container.appendChild(contentSection);

    return container;
  },
};

export const ResponsiveTest: Story = {
  name: "Responsive Layout Test",
  args: {
    sticky: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story:
          "Test the responsive behavior by changing viewport sizes. Desktop: Logo (left) | Nav (center) | Actions (right). Mobile: Actions (left) | Logo (center) | Nav (offcanvas).",
      },
    },
  },
  render: (args) => {
    const container = document.createElement("div");
    container.className = "min-h-screen bg-background";

    const sticky = document.createElement("wc-sticky");
    if (!args.sticky) {
      sticky.removeAttribute("sticky");
    }

    // Logo with indicator
    const logoSlot = document.createElement("div");
    logoSlot.setAttribute("slot", "logo");
    logoSlot.className = "bg-primary/10 px-3 py-2 rounded";
    const logoText = document.createElement("span");
    logoText.className = "text-primary font-semibold text-sm";
    logoText.textContent = "LOGO";
    logoSlot.appendChild(logoText);
    sticky.appendChild(logoSlot);

    // Navigation with indicator
    const navSlot = document.createElement("div");
    navSlot.setAttribute("slot", "navigation");
    navSlot.className = "bg-secondary/10 px-3 py-2 rounded";
    const navText = document.createElement("span");
    navText.className = "text-secondary font-semibold text-sm";
    navText.textContent = "NAVIGATION";
    navSlot.appendChild(navText);
    sticky.appendChild(navSlot);

    // Actions with indicator
    const actionsSlot = document.createElement("div");
    actionsSlot.setAttribute("slot", "actions");
    actionsSlot.className = "bg-tertiary/10 px-3 py-2 rounded";
    const actionsText = document.createElement("span");
    actionsText.className = "text-tertiary font-semibold text-sm";
    actionsText.textContent = "ACTIONS";
    actionsSlot.appendChild(actionsText);
    sticky.appendChild(actionsSlot);

    container.appendChild(sticky);

    // Instructions
    const instructionSection = document.createElement("section");
    instructionSection.className = "p-8 bg-surface";
    instructionSection.innerHTML = `
      <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-3xl font-bold text-onSurface mb-6">Responsive Sticky Test</h1>
        <div class="grid gap-4 text-left mb-6">
          <div class="p-4 bg-surfaceContainer rounded-lg">
            <h3 class="font-semibold text-primary mb-2">Desktop (> 768px)</h3>
            <p class="text-onSurfaceVariant text-sm">Layout: Logo (Left) | Navigation (Center) | Actions (Right)</p>
          </div>
          <div class="p-4 bg-surfaceContainer rounded-lg">
            <h3 class="font-semibold text-secondary mb-2">Mobile (≤ 768px)</h3>
            <p class="text-onSurfaceVariant text-sm">Layout: Actions (Left) | Logo (Center) | Navigation (Offcanvas)</p>
          </div>
        </div>
        <p class="text-onSurfaceVariant">Use Storybook's viewport controls to test different screen sizes.</p>
      </div>
    `;
    container.appendChild(instructionSection);

    return container;
  },
};
