import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const here = path.dirname(fileURLToPath(import.meta.url));
const t = JSON.parse(
  fs.readFileSync(
    path.join(here, "../../packages/tokens/src/tokens.json"),
    "utf8",
  ),
);
const sizes = ["micro", "small", "medium", "large", "hero"];
for (let i = 1; i < sizes.length; i++) {
  for (const k of ["radius", "border", "elevation"])
    if (t.scale[sizes[i]][k] < t.scale[sizes[i - 1]][k])
      throw new Error(`Scale Law: ${sizes[i]} ${k}`);
}
const spectrum = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
];
if (JSON.stringify(Object.keys(t.spectrum)) !== JSON.stringify(spectrum))
  throw new Error("Spectrum contract mismatch");
console.log("STRATA token contract passed");
