import type { Meta, StoryObj } from "@storybook/html";
import { randParagraph, randMusicGenre } from "@ngneat/falso";

const meta = {
  title: "Components/Accordion",
  component: "wc-accordion",
  tags: ["autodocs"],
  render: () => {
    const accordion = document.createElement("wc-accordion");

    // First item (open by default)
    const item1 = document.createElement("wc-accordion-item");
    item1.setAttribute("open", "true");

    const header1 = document.createElement("div");
    header1.slot = "header";
    header1.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="icon-[carbon--user] w-5 h-5 text-primary"></span>
        <span class="font-medium">Getting Started</span>
      </div>
    `;

    const content1 = document.createElement("div");
    content1.innerHTML = `
      <p class="text-onSurfaceVariant mb-3">${randParagraph()}</p>
      <div class="p-3 bg-primaryContainer border-l-4 border-primary">
        <p class="text-onPrimaryContainer text-sm">${randParagraph().substring(0, 120)}</p>
      </div>
    `;

    item1.appendChild(header1);
    item1.appendChild(content1);

    // Second item
    const item2 = document.createElement("wc-accordion-item");

    const header2 = document.createElement("div");
    header2.slot = "header";
    header2.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="icon-[carbon--settings] w-5 h-5 text-primary"></span>
        <span class="font-medium">Configuration</span>
      </div>
    `;

    const content2 = document.createElement("div");
    content2.innerHTML = `
      <p class="text-onSurfaceVariant mb-3">${randParagraph()}</p>
      <ul class="space-y-2">
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
    `;

    item2.appendChild(header2);
    item2.appendChild(content2);

    // Third item (disabled)
    const item3 = document.createElement("wc-accordion-item");
    item3.setAttribute("disabled", "true");

    const header3 = document.createElement("div");
    header3.slot = "header";
    header3.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="icon-[carbon--locked] w-5 h-5 text-onSurfaceVariant"></span>
        <span class="font-medium text-onSurfaceVariant">Advanced Settings</span>
      </div>
    `;

    const content3 = document.createElement("div");
    content3.innerHTML = `<p class="text-onSurfaceVariant">${randParagraph()}</p>`;

    item3.appendChild(header3);
    item3.appendChild(content3);

    accordion.appendChild(item1);
    accordion.appendChild(item2);
    accordion.appendChild(item3);

    return accordion;
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const Bordered: Story = {
  render: () => {
    const accordion = document.createElement("wc-accordion");
    accordion.setAttribute("variant", "bordered");

    // Add the same items as default
    const defaultStory = meta.render();
    Array.from(defaultStory.children).forEach((child) => {
      accordion.appendChild(child.cloneNode(true));
    });

    return accordion;
  },
};

export const Separated: Story = {
  render: () => {
    const accordion = document.createElement("wc-accordion");
    accordion.setAttribute("variant", "separated");

    // Add the same items as default
    const defaultStory = meta.render();
    Array.from(defaultStory.children).forEach((child) => {
      accordion.appendChild(child.cloneNode(true));
    });

    return accordion;
  },
};

export const MultipleOpen: Story = {
  render: () => {
    const accordion = document.createElement("wc-accordion");
    accordion.setAttribute("multiple", "true");

    // Create items that are all open
    Array.from({ length: 3 }, (_, i) => {
      const item = document.createElement("wc-accordion-item");
      item.setAttribute("open", "true");

      const header = document.createElement("div");
      header.slot = "header";
      header.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="icon-[carbon--document] w-5 h-5 text-primary"></span>
          <span class="font-medium">Section ${i + 1}</span>
        </div>
      `;

      const content = document.createElement("div");
      content.innerHTML = `<p class="text-onSurfaceVariant">${randParagraph()}</p>`;

      item.appendChild(header);
      item.appendChild(content);
      accordion.appendChild(item);
    });

    return accordion;
  },
};

export const FAQExample: Story = {
  render: () => {
    const accordion = document.createElement("wc-accordion");
    accordion.setAttribute("variant", "bordered");

    const faqData = [
      {
        question: "How do I get started with the platform?",
        answer: randParagraph(),
      },
      {
        question: "Is there a free trial available?",
        answer: randParagraph(),
      },
      {
        question: "What kind of support do you offer?",
        answer: randParagraph(),
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer: randParagraph(),
      },
    ];

    faqData.forEach((item, index) => {
      const faqItem = document.createElement("wc-accordion-item");
      if (index === 0) faqItem.setAttribute("open", "true");

      const header = document.createElement("div");
      header.slot = "header";
      header.innerHTML = `<span class="font-medium">${item.question}</span>`;

      const content = document.createElement("div");
      content.innerHTML = `<p class="text-onSurfaceVariant">${item.answer}</p>`;

      faqItem.appendChild(header);
      faqItem.appendChild(content);
      accordion.appendChild(faqItem);
    });

    return accordion;
  },
};
