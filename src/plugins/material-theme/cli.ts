import { generateThemeFiles } from "./theme-generator";

const root = process.cwd();
const outputDir = "src/styles";

console.log("👹 Supay - Generating Material Design theme...\n");
generateThemeFiles(root, outputDir);
