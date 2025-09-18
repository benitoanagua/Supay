import type { Meta, StoryObj } from "@storybook/html";
import { randUrl, randMusicGenre } from "@ngneat/falso";
import type { MenuProps } from "../types/menu.js";

const meta: Meta<MenuProps> = {
  title: "Components/Menu",
  component: "wc-menu",
  tags: ["autodocs"],
  render: () => {
    const menu = document.createElement("wc-menu");

    // Create menu items data
    const menuItems = Array.from({ length: 5 }, (_, index) => ({
      slug: randMusicGenre(),
      url: randUrl(),
      active: index === 0,
    }));

    // Set menu property
    const menuData = menuItems.reduce(
      (acc, item, index) => {
        acc[`item-${index + 1}`] = {
          url: item.url,
          title: item.slug,
          active: item.active,
        };
        return acc;
      },
      {} as Record<string, any>
    );

    menu.menu = menuData;

    // Add event listeners for demo purposes
    menu.addEventListener("menu-toggle", (e: any) => {
      console.log("Menu toggled:", e.detail.isOpen);
    });

    menu.addEventListener("menu-item-selected", (e: any) => {
      console.log("Menu item selected:", e.detail);
    });

    return menu;
  },
} satisfies Meta<MenuProps>;

export default meta;
type Story = StoryObj<MenuProps>;

export const Default: Story = {
  args: {},
};

export const WithSlotItems: Story = {
  args: {},
  render: () => {
    const menu = document.createElement("wc-menu");

    // Add menu items via slot
    const menuItems = Array.from({ length: 3 }, (_, index) => {
      const item = document.createElement("wc-menu-item");
      item.setAttribute("url", randUrl());
      item.setAttribute("title", randMusicGenre());
      if (index === 0) item.setAttribute("active", "true");
      return item;
    });

    menuItems.forEach((item) => menu.appendChild(item));

    return menu;
  },
};
