import fs from "node:fs";
const t = JSON.parse(
  fs.readFileSync(new URL("./src/tokens.json", import.meta.url)),
);
const order = ["micro", "small", "medium", "large", "hero"];
for (let i = 1; i < order.length; i++) {
  const a = t.scale[order[i - 1]],
    b = t.scale[order[i]];
  if (b.radius < a.radius || b.border < a.border || b.elevation < a.elevation)
    throw new Error(
      `STRATA Scale Law violated: ${order[i - 1]} -> ${order[i]}`,
    );
}
if (
  Object.keys(t.spectrum).join(",") !==
  "red,orange,yellow,green,blue,indigo,violet"
)
  throw new Error("STRATA Spectrum must contain seven canonical colors");
console.log("STRATA token validation passed");
