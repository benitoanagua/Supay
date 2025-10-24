import type { Meta, StoryObj } from "@storybook/html";
import { randPhrase, randCatchPhrase } from "@ngneat/falso";

const meta = {
  title: "Components/Carousel",
  component: "wc-carousel",
  tags: ["autodocs"],
  render: () => {
    const carousel = document.createElement("wc-carousel");
    carousel.setAttribute("desktop", "3");
    carousel.setAttribute("mobile", "1");
    carousel.setAttribute("gap", "medium");
    carousel.setAttribute("interval", "4000");
    carousel.setAttribute("auto-play", "true");
    carousel.setAttribute("show-arrows", "true");
    carousel.setAttribute("show-dots", "true");

    // Create carousel items
    for (let i = 0; i < 6; i++) {
      const item = document.createElement("wc-carousel-item");

      const content = document.createElement("div");
      content.className =
        "p-6 bg-surfaceContainerHigh border border-outlineVariant rounded-lg min-h-[200px] flex flex-col justify-between";
      content.innerHTML = `
        <div class="text-center">
          <div class="text-4xl font-bold text-primary mb-3">${i + 1}</div>
          <h3 class="text-lg font-medium text-onSurface mb-2">${randCatchPhrase()}</h3>
          <p class="text-onSurfaceVariant">${randPhrase()}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-outlineVariant">
          <span class="text-sm text-onSurfaceVariant">Item ${i + 1}</span>
        </div>
      `;

      item.appendChild(content);
      carousel.appendChild(item);
    }

    return carousel;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const SingleItem: Story = {
  render: () => {
    const carousel = document.createElement("wc-carousel");
    carousel.setAttribute("desktop", "1");
    carousel.setAttribute("mobile", "1");
    carousel.setAttribute("gap", "medium");
    carousel.setAttribute("auto-play", "true");
    carousel.setAttribute("show-arrows", "true");
    carousel.setAttribute("show-dots", "true");

    for (let i = 0; i < 4; i++) {
      const item = document.createElement("wc-carousel-item");

      const content = document.createElement("div");
      content.className =
        "p-8 bg-gradient-to-br from-primaryContainer to-secondaryContainer border border-outlineVariant rounded-lg min-h-[300px] flex items-center justify-center";
      content.innerHTML = `
        <div class="text-center text-onPrimaryContainer">
          <div class="text-6xl font-bold mb-4">${i + 1}</div>
          <h3 class="text-2xl font-medium mb-3">Featured Content</h3>
          <p class="text-lg">${randCatchPhrase()}</p>
        </div>
      `;

      item.appendChild(content);
      carousel.appendChild(item);
    }

    return carousel;
  },
};

export const NoAutoPlay: Story = {
  render: () => {
    const carousel = document.createElement("wc-carousel");
    carousel.setAttribute("desktop", "2");
    carousel.setAttribute("mobile", "1");
    carousel.setAttribute("gap", "large");
    carousel.setAttribute("auto-play", "false");
    carousel.setAttribute("show-arrows", "true");
    carousel.setAttribute("show-dots", "true");

    for (let i = 0; i < 5; i++) {
      const item = document.createElement("wc-carousel-item");

      const content = document.createElement("div");
      content.className =
        "p-6 bg-surfaceContainerLow border border-outlineVariant rounded-lg min-h-[180px] flex items-center justify-center";
      content.innerHTML = `
        <div class="text-center">
          <div class="text-3xl font-bold text-secondary mb-2">${i + 1}</div>
          <p class="text-onSurfaceVariant">${randPhrase()}</p>
        </div>
      `;

      item.appendChild(content);
      carousel.appendChild(item);
    }

    return carousel;
  },
};

export const MinimalNavigation: Story = {
  render: () => {
    const carousel = document.createElement("wc-carousel");
    carousel.setAttribute("desktop", "4");
    carousel.setAttribute("mobile", "2");
    carousel.setAttribute("gap", "small");
    carousel.setAttribute("auto-play", "true");
    carousel.setAttribute("show-arrows", "false");
    carousel.setAttribute("show-dots", "true");

    for (let i = 0; i < 8; i++) {
      const item = document.createElement("wc-carousel-item");

      const content = document.createElement("div");
      content.className =
        "p-4 bg-surfaceContainerHigh border border-outlineVariant rounded-lg min-h-[150px] flex items-center justify-center";
      content.innerHTML = `
        <div class="text-center">
          <div class="text-2xl font-bold text-primary mb-1">${i + 1}</div>
          <p class="text-onSurfaceVariant text-sm">${randPhrase().substring(0, 60)}</p>
        </div>
      `;

      item.appendChild(content);
      carousel.appendChild(item);
    }

    return carousel;
  },
};

export const ProductShowcase: Story = {
  render: () => {
    const carousel = document.createElement("wc-carousel");
    carousel.setAttribute("desktop", "4");
    carousel.setAttribute("mobile", "2");
    carousel.setAttribute("gap", "medium");
    carousel.setAttribute("auto-play", "true");
    carousel.setAttribute("show-arrows", "true");
    carousel.setAttribute("show-dots", "true");

    const products = [
      "Premium Headphones",
      "Smart Watch Series",
      "Wireless Earbuds",
      "Gaming Keyboard",
      "Bluetooth Speaker",
      "Phone Case",
      "Tablet Stand",
      "Camera Lens",
    ];

    products.forEach((product, i) => {
      const item = document.createElement("wc-carousel-item");

      const content = document.createElement("div");
      content.className =
        "p-6 bg-surfaceContainerHighest border border-outlineVariant rounded-lg min-h-[250px] flex flex-col";
      content.innerHTML = `
        <div class="flex-1 flex items-center justify-center mb-4">
          <div class="w-16 h-16 bg-primaryContainer rounded-full flex items-center justify-center">
            <span class="text-2xl font-bold text-onPrimaryContainer">${i + 1}</span>
          </div>
        </div>
        <div class="text-center">
          <h3 class="font-medium text-onSurface mb-2">${product}</h3>
          <p class="text-onSurfaceVariant text-sm mb-3">${randPhrase().substring(0, 80)}</p>
          <div class="text-primary font-semibold">$${Math.floor(Math.random() * 200) + 50}</div>
        </div>
      `;

      item.appendChild(content);
      carousel.appendChild(item);
    });

    return carousel;
  },
};
