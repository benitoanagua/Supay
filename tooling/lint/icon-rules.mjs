import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const sourceRoots = [path.join(root, "packages"), path.join(root, "apps")];
const allowedPrefix = "carbon:";
const manifests = [path.join(root, "packages/components/package.json")];
for (const manifest of manifests) {
  const pkg = JSON.parse(fs.readFileSync(manifest, "utf8"));
  if (!pkg.dependencies?.["@iconify-json/carbon"])
    violations.push(
      `${path.relative(root, manifest)}: @iconify-json/carbon must be a runtime dependency`,
    );
  if (
    pkg.dependencies?.["@iconify-json/material"] ||
    pkg.dependencies?.["@iconify-json/lucide"]
  )
    violations.push(
      `${path.relative(root, manifest)}: non-Carbon icon collection dependency`,
    );
}
const iconPattern =
  /(?:icon\s*=\s*["'`]([^"'`]+)["'`]|icon\s*=\s*\{?\s*["'`]([^"'`]+)["'`])/g;
const violations = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.name === "node_modules" ||
      entry.name === "dist" ||
      entry.name.startsWith(".")
    )
      continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|tsx|js|jsx|html|md)$/.test(entry.name)) checkFile(full);
  }
}

function checkFile(file) {
  const text = fs.readFileSync(file, "utf8");
  let match;
  while ((match = iconPattern.exec(text))) {
    const value = match[1] ?? match[2];
    if (!value || value.startsWith("${") || value.includes("${")) continue;
    if (!value.startsWith(allowedPrefix)) {
      violations.push(
        `${path.relative(root, file)}: icon "${value}" is outside the allowed Carbon collection`,
      );
    }
  }
}

for (const dir of sourceRoots) walk(dir);

if (violations.length) {
  console.error(
    "STRATA icon collection audit failed. Only Carbon icons are allowed:",
  );
  for (const violation of violations) console.error(`- ${violation}`);
  process.exit(1);
}

console.log(
  "STRATA icon collection audit passed: Carbon is the only allowed icon collection.",
);
