import fs from "node:fs";
import path from "node:path";

const root = path.resolve("packages/components/src");
const violations = [];
const allowedRadius =
  /var\(--strata-radius-(micro|small|medium|large|hero)\)|var\(--strata-component-radius\)|999px|50%|inherit|0/;
const allowedShadow =
  /var\(--strata-elevation-(micro|small|medium|large|hero)\)|var\(--strata-component-elevation\)|none/;
const allowedBorderWidth =
  /var\(--strata-border-(micro|small|medium|large|hero)\)|0|thin|medium|thick/;
const rawColor = /#[0-9a-fA-F]{3,8}\b|\brgb\(|\brgba\(|\bhsl\(|\bhsla\(/;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.name === "dist" || entry.name.startsWith(".")) continue;
    if (entry.isDirectory()) walk(full);
    else if (/\.(ts|css)$/.test(entry.name)) checkFile(full);
  }
}

function checkFile(file) {
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\n/);
  lines.forEach((line, i) => {
    const n = i + 1;
    if (rawColor.test(line))
      violations.push(`${file}:${n} raw color; use STRATA color tokens`);
    const shadow = line.match(/box-shadow\s*:\s*([^;]+)/);
    if (shadow && !allowedShadow.test(shadow[1]))
      violations.push(`${file}:${n} non-token shadow`);
    const radius = line.match(/border-radius\s*:\s*([^;]+)/);
    if (radius && !allowedRadius.test(radius[1]))
      violations.push(`${file}:${n} non-token radius`);
    const border = line.match(
      /(?:^|[;{])border(?:-(?:width|top|right|bottom|left))?\s*:\s*([^;]+)/,
    );
    if (
      border &&
      !allowedBorderWidth.test(border[1]) &&
      !border[1].includes("solid")
    )
      violations.push(`${file}:${n} non-token border width`);
    if (
      file.endsWith("NavItem.ts") &&
      line.includes(":host([selected])") &&
      line.slice(line.indexOf(":host([selected])")).includes("border:")
    )
      violations.push(
        `${file}:${n} selected navigation must not use a decorative border`,
      );
    if (
      line.includes("<iconify-icon") &&
      /icon\s*=\s*["'](?!carbon:)/.test(line)
    )
      violations.push(`${file}:${n} icon must use carbon:*`);
  });
}

walk(root);

if (violations.length) {
  console.error("STRATA design-rule lint failed:");
  console.error(violations.join("\n"));
  process.exit(1);
}
console.log("STRATA design-rule lint passed");
