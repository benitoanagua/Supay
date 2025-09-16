#!/usr/bin/env node

const { execSync } = require("child_process");
const { mkdirSync } = require("fs");
const { join } = require("path");

class AlternativeZipPackager {
  constructor() {
    this.projectRoot = join(__dirname, "..", "..");
    this.tempDir = join(this.projectRoot, ".temp-package");
  }

  runCommand(command) {
    try {
      console.log(`⚡ Executing: ${command}`);
      execSync(command, { stdio: "inherit", cwd: this.projectRoot });
      return true;
    } catch (error) {
      console.error(`❌ Error: ${command}`, error.message);
      return false;
    }
  }

  cleanup() {
    this.runCommand(`rm -rf "${this.tempDir}"`);
    this.runCommand(`rm -f filelist.txt`);
  }

  async packageTheme() {
    console.log("📦 Alternative packaging method...\n");

    try {
      // Cleanup previous temp dir
      this.cleanup();

      // Create temp directory
      mkdirSync(this.tempDir, { recursive: true });

      // Build production
      console.log("🔨 Building production CSS...");
      if (!this.runCommand("npm run build")) {
        throw new Error("Build failed");
      }

      // Copy only necessary files using rsync with comprehensive excludes
      const rsyncCommand = `rsync -av --progress \
                --exclude='.git' \
                --exclude='.gitignore' \
                --exclude='node_modules' \
                --exclude='src' \
                --exclude='scripts' \
                --exclude='pnpm-lock.yaml' \
                --exclude='package-lock.json' \
                --exclude='yarn.lock' \
                --exclude='*.log' \
                --exclude='.DS_Store' \
                --exclude='Thumbs.db' \
                --exclude='.idea' \
                --exclude='.vscode' \
                --exclude='*.zip' \
                --exclude='*.tar.gz' \
                --exclude='*.map' \
                --exclude='*.md' \
                --exclude='*.txt' \
                --exclude='filelist.txt' \
                --exclude='.temp-package' \
                --exclude='._*' \
                --exclude='ehthumbs.db' \
                --exclude='Desktop.ini' \
                ./ ${this.tempDir}/`;

      if (!this.runCommand(rsyncCommand)) {
        throw new Error("File copy failed");
      }

      const version = this.getPackageVersion();
      const zipFileName = `supay-${version}.zip`;

      // Create zip from temp directory
      console.log(`📁 Creating package: ${zipFileName}`);
      const zipCommand = `cd "${this.tempDir}" && zip -r ../${zipFileName} .`;

      if (!this.runCommand(zipCommand)) {
        throw new Error("Zip creation failed");
      }

      // Verify no lock files are included
      const verifyCommand = `unzip -l ${zipFileName} | grep -E "(pnpm-lock|package-lock|yarn.lock)" || echo "No lock files found ✓"`;
      this.runCommand(verifyCommand);

      console.log(`\n✅ Package created: ${zipFileName}`);
      console.log(
        "📊 Size:",
        execSync(`du -h ${zipFileName}`).toString().trim()
      );
    } catch (error) {
      console.error(`❌ Packaging failed: ${error.message}`);
      process.exit(1);
    } finally {
      this.cleanup();
    }
  }

  getPackageVersion() {
    try {
      const packageJson = JSON.parse(
        require("fs").readFileSync(
          join(this.projectRoot, "package.json"),
          "utf8"
        )
      );
      return packageJson.version;
    } catch {
      return "unknown";
    }
  }
}

if (require.main === module) {
  new AlternativeZipPackager().packageTheme().catch(console.error);
}
