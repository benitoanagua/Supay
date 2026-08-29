import { defineConfig } from "vite";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins:[tailwindcss()],
  build:{target:"es2021",cssCodeSplit:false,outDir:"dist",lib:{entry:resolve(__dirname,"src/main.ts"),name:"StrataElements",fileName:()=>"strata-components.es.js",formats:["es"]},rollupOptions:{external:["lit"]}}
});
