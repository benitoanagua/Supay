import fs from "node:fs";
import path from "node:path";
const root = path.resolve("packages/components/src");
const allowed = path.resolve(root, "elements/legacy.ts");
let violations = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
    const f=path.join(dir,e.name);
    if(e.isDirectory()) walk(f); else if(/\.(ts|tsx|js|jsx|html|css)$/.test(e.name) && path.resolve(f)!==allowed){
      const s=fs.readFileSync(f,"utf8");
      if(/\bwc-[a-z0-9-]+\b/.test(s)) violations.push(f);
    }
  }
}
walk(root);
if(violations.length){ console.error("Legacy wc-* references found outside compatibility bridge:",...violations); process.exit(1); }
console.log("STRATA legacy migration audit passed.");
