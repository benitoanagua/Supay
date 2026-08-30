import "@strata/components";

export const catalog = [
  [
    "Button",
    "strata-button",
    `<strata-button label="Read more" icon="carbon:arrow-right"></strata-button>`,
  ],
  ["Card", "strata-card", `<strata-card>Editorial surface</strata-card>`],
  [
    "TextField",
    "strata-text-field",
    `<strata-text-field label="Search"></strata-text-field>`,
  ],
  ["Select", "strata-select", `<strata-select></strata-select>`],
  [
    "Navigation",
    "strata-nav-item",
    `<strata-nav-item label="Home" selected></strata-nav-item>`,
  ],
  [
    "Alert",
    "strata-alert",
    `<strata-alert tone="info">Information</strata-alert>`,
  ],
  ["Badge", "strata-badge", `<strata-badge>New</strata-badge>`],
  [
    "Divider",
    "strata-divider",
    `<strata-divider variant="double"></strata-divider>`,
  ],
  ["Data", "strata-data-table", `<strata-data-table></strata-data-table>`],
  ["Dialog", "strata-dialog", `<strata-dialog></strata-dialog>`],
] as const;
