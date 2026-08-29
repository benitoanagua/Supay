#!/usr/bin/env node
/** Conservative migration helper: replaces only canonical legacy custom-element tags. */
import fs from "node:fs";
import path from "node:path";

const map = {
  "wc-accordion": "strata-accordion",
  "wc-accordion-item": "strata-accordion-item",
  "wc-button": "strata-button",
  "wc-card": "strata-card",
  "wc-carousel": "strata-carousel",
  "wc-carousel-item": "strata-carousel-item",
  "wc-grille": "strata-grille",
  "wc-grille-item": "strata-grille-item",
  "wc-logo": "strata-logo",
  "wc-modal": "strata-modal",
  "wc-overlay": "strata-overlay",
  "wc-tab": "strata-tab",
  "wc-tab-panel": "strata-tab-panel",
  "wc-tabs": "strata-tabs",
  "wc-theme-toggle": "strata-theme-toggle",
};

const root = process.argv[2];
if (!root) {
  console.error("Usage: node tooling/migration/wc-to-strata.mjs <directory>");
  process.exit(1);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(html?|tsx?|jsx?)$/.test(entry.name)) {
      let source = fs.readFileSync(full, "utf8");
      let next = source;
      for (const [from, to] of Object.entries(map)) next = next.replaceAll(from, to);
      if (next !== source) {
        fs.writeFileSync(full, next);
        console.log(full);
      }
    }
  }
}
walk(path.resolve(root));
