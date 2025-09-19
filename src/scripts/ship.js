#!/usr/bin/env node

import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class ThemePublisher {
  constructor() {
    this.projectRoot = join(__dirname, "..", "..");
  }

  runCommand(command) {
    try {
      console.log(`⚡ Executing: ${command}`);
      execSync(command, { stdio: "inherit", cwd: this.projectRoot });
      return true;
    } catch (error) {
      console.error(`❌ Command failed: ${command}`, error.message);
      return false;
    }
  }

  checkGitStatus() {
    try {
      const status = execSync("git status --porcelain").toString().trim();
      if (status) {
        console.log("❌ Uncommitted changes found:");
        console.log(status);
        return false;
      }
      return true;
    } catch (error) {
      console.error("❌ Git status check failed:", error.message);
      return false;
    }
  }

  updateVersion() {
    try {
      const packagePath = join(this.projectRoot, "package.json");
      const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
      const [major, minor, patch] = packageJson.version.split(".").map(Number);

      const newVersion = `${major}.${minor}.${patch + 1}`;
      packageJson.version = newVersion;

      writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");
      console.log(`🔄 Version updated: ${packageJson.version} → ${newVersion}`);
      return newVersion;
    } catch (error) {
      console.error("❌ Version update failed:", error.message);
      return null;
    }
  }

  async publishTheme() {
    console.log("🚀 Publishing Supay Ghost Theme...\n");

    // Check Git status
    console.log("🔍 Checking Git status...");
    if (!this.checkGitStatus()) process.exit(1);

    // Run Ghost validation
    console.log("🧪 Running GScan validation...");
    if (!this.runCommand("npm test")) process.exit(1);

    // Build production version
    console.log("🔨 Building production version...");
    if (!this.runCommand("npm run build")) process.exit(1);

    // Update version
    console.log("🆕 Updating version...");
    const newVersion = this.updateVersion();
    if (!newVersion) process.exit(1);

    // Create distribution package
    console.log("📦 Creating distribution package...");
    if (!this.runCommand("npm run zip")) process.exit(1);

    // Git operations
    console.log("📝 Committing version update...");
    if (!this.runCommand("git add package.json")) process.exit(1);
    if (!this.runCommand(`git commit -m "chore: release v${newVersion}"`))
      process.exit(1);
    if (!this.runCommand(`git tag v${newVersion}`)) process.exit(1);

    console.log("\n✅ Ready to push to repository:");
    console.log("   git push && git push --tags");
    console.log(`\n🎉 Version ${newVersion} is ready for distribution!`);
  }
}

// Execute publishing
new ThemePublisher().publishTheme().catch(console.error);
