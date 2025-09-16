import type { Meta, StoryObj } from "@storybook/html";
import { randUrl, randMusicGenre } from "@ngneat/falso";

interface MenuProps {
  dark: boolean;
  home: string;
}

const meta = {
  title: "Components/Menu",
  component: "wc-menu",
  tags: ["autodocs"],
  argTypes: {
    dark: {
      control: { type: "boolean" },
    },
    home: {
      control: { type: "text" },
    },
  },
  render: (args: MenuProps) => {
    const menu = document.createElement("wc-menu");

    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        menu.setAttribute(key, String(value));
      }
    });

    const logo = document.createElement("wc-logo");
    logo.setAttribute("slot", "logo");
    menu.appendChild(logo);

    const searchBtn = document.createElement("button");
    searchBtn.setAttribute("slot", "search");
    searchBtn.className = "border-0 bg-white p-1";
    const searchIcon = document.createElement("span");
    searchIcon.className = "i-ri-search-line block h-6 w-6";
    searchBtn.appendChild(searchIcon);
    menu.appendChild(searchBtn);

    const nav = Array.from({ length: 5 }, () => ({
      slug: randMusicGenre(),
      url: randUrl(),
    }));

    nav.forEach((item, index) => {
      const menuItem = document.createElement("wc-menu-item");
      menuItem.setAttribute("url", item.url);
      if (index === 0) menuItem.setAttribute("current", "true");
      menuItem.textContent = item.slug;
      menu.appendChild(menuItem);
    });

    return menu;
  },
} satisfies Meta<MenuProps>;

export default meta;
type Story = StoryObj<MenuProps>;

export const Default: Story = {
  args: {
    dark: false,
    home: "#",
  },
};

export const Dark: Story = {
  args: {
    dark: true,
    home: "#",
  },
};
