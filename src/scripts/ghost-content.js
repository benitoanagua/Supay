#!/usr/bin/env node

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colores para JSON
const colors = {
  reset: "\x1b[0m",
  key: "\x1b[36m", // cyan
  string: "\x1b[32m", // green
  number: "\x1b[33m", // yellow
  boolean: "\x1b[35m", // magenta
  null: "\x1b[90m", // gray
  punctuation: "\x1b[37m", // white
  url: "\x1b[34m", // blue
  date: "\x1b[36m", // cyan
};

class GhostContentAPIExplorer {
  constructor() {
    this.projectRoot = join(__dirname, "..", "..");
    this.defaultLimit = 5;
  }

  async makeRequest(endpoint, apiKey, ghostUrl, params = {}) {
    const url = new URL(`${ghostUrl}/ghost/api/content/${endpoint}`);
    url.searchParams.append("key", apiKey);

    // Add optional parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });

    const headers = {
      "Accept-Version": "v5.0",
      "User-Agent": "Ghost-Content-API-Explorer/1.0",
    };

    try {
      console.log(
        `🌐 ${colors.url}Fetching:${colors.reset} ${colors.string}${url.toString()}${colors.reset}`
      );
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(
        `❌ ${colors.string}Request failed:${colors.reset} ${error.message}`
      );
      return null;
    }
  }

  colorizeJson(json, indent = 2) {
    const jsonString = JSON.stringify(json, null, indent);
    return jsonString.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let color = colors.punctuation;

        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            color = colors.key; // keys
          } else {
            // Check if it's a URL, date, or regular string
            const value = match.replace(/^"|"$/g, "");
            if (value.match(/^https?:\/\//)) {
              color = colors.url;
            } else if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
              color = colors.date;
            } else {
              color = colors.string;
            }
          }
        } else if (/true|false/.test(match)) {
          color = colors.boolean;
        } else if (/null/.test(match)) {
          color = colors.null;
        } else if (!isNaN(match)) {
          color = colors.number;
        }

        return color + match + colors.reset;
      }
    );
  }

  printJsonResults(data, resourceType, showStats = false) {
    if (!data) {
      console.log("📭 No data received from API");
      return;
    }

    console.log(`\n🎯 ${colors.key}Complete API Response:${colors.reset}`);
    console.log("═".repeat(60));

    if (showStats) {
      this.printStatistics(data, resourceType);
      console.log(`\n📦 ${colors.key}JSON Response:${colors.reset}`);
    }

    // Pretty print the JSON response with colors
    const coloredJson = this.colorizeJson(data);
    console.log(coloredJson);

    if (showStats) {
      this.printApiExample(data, resourceType);
    }
  }

  printStatistics(data, resourceType) {
    console.log(`\n📊 ${colors.key}Response Statistics:${colors.reset}`);
    console.log("─".repeat(40));

    if (data[resourceType] && Array.isArray(data[resourceType])) {
      const items = data[resourceType];
      console.log(
        `   ${colors.key}Resource type:${colors.reset} ${colors.string}${resourceType}${colors.reset}`
      );
      console.log(
        `   ${colors.key}Items count:${colors.reset}   ${colors.number}${items.length}${colors.reset}`
      );

      if (data.meta?.pagination) {
        const pagination = data.meta.pagination;
        console.log(
          `   ${colors.key}Total items:${colors.reset}   ${colors.number}${pagination.total}${colors.reset}`
        );
        console.log(
          `   ${colors.key}Total pages:${colors.reset}   ${colors.number}${pagination.pages}${colors.reset}`
        );
        console.log(
          `   ${colors.key}Current page:${colors.reset}  ${colors.number}${pagination.page}${colors.reset}`
        );
        console.log(
          `   ${colors.key}Items per page:${colors.reset} ${colors.number}${pagination.limit}${colors.reset}`
        );
      }

      // Show sample of item fields if available
      if (items.length > 0) {
        const sampleItem = items[0];
        console.log(`\n   ${colors.key}Sample item fields:${colors.reset}`);
        Object.keys(sampleItem)
          .slice(0, 8)
          .forEach((key) => {
            console.log(
              `     ${colors.punctuation}-${colors.reset} ${colors.key}${key}${colors.reset}`
            );
          });
        if (Object.keys(sampleItem).length > 8) {
          console.log(
            `     ${colors.punctuation}-${colors.reset} ${colors.null}...and ${Object.keys(sampleItem).length - 8} more fields${colors.reset}`
          );
        }
      }
    } else if (resourceType === "settings") {
      console.log(
        `   ${colors.key}Resource type:${colors.reset} ${colors.string}settings${colors.reset}`
      );
      console.log(
        `   ${colors.key}Settings count:${colors.reset} ${colors.number}${Object.keys(data.settings || {}).length}${colors.reset}`
      );
    }
  }

  printApiExample(data, resourceType) {
    console.log(`\n💡 ${colors.key}API Structure:${colors.reset}`);
    console.log("─".repeat(30));

    if (data[resourceType] && Array.isArray(data[resourceType])) {
      console.log(
        `   ${colors.key}Endpoint:${colors.reset} ${colors.string}/ghost/api/content/${resourceType}/${colors.reset}`
      );
      console.log(
        `   ${colors.key}Response:${colors.reset} ${colors.punctuation}{${colors.reset} ${colors.key}"${resourceType}"${colors.reset}${colors.punctuation}:${colors.reset} ${colors.punctuation}[${colors.reset}${colors.punctuation}...${colors.reset}${colors.punctuation}]${colors.reset}${colors.punctuation},${colors.reset} ${colors.key}"meta"${colors.reset}${colors.punctuation}:${colors.reset} ${colors.punctuation}{${colors.reset}${colors.punctuation}...${colors.reset}${colors.punctuation}}${colors.reset} ${colors.punctuation}}${colors.reset}`
      );
    } else if (resourceType === "settings") {
      console.log(
        `   ${colors.key}Endpoint:${colors.reset} ${colors.string}/ghost/api/content/settings/${colors.reset}`
      );
      console.log(
        `   ${colors.key}Response:${colors.reset} ${colors.punctuation}{${colors.reset} ${colors.key}"settings"${colors.reset}${colors.punctuation}:${colors.reset} ${colors.punctuation}{${colors.reset}${colors.punctuation}...${colors.reset}${colors.punctuation}}${colors.reset} ${colors.punctuation}}${colors.reset}`
      );
    }
  }

  parseArgs() {
    const args = process.argv.slice(2);
    const params = {};

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      if (arg.startsWith("--")) {
        if (arg.includes("=")) {
          const [key, value] = arg.slice(2).split("=");
          params[key] = value;
        } else {
          const key = arg.slice(2);
          if (args[i + 1] && !args[i + 1].startsWith("-")) {
            params[key] = args[i + 1];
            i++;
          } else {
            params[key] = true;
          }
        }
      } else if (arg.startsWith("-")) {
        const key = arg.slice(1);
        if (args[i + 1] && !args[i + 1].startsWith("-")) {
          params[key] = args[i + 1];
          i++;
        } else {
          params[key] = true;
        }
      }
    }

    return params;
  }

  showHelp() {
    console.log(
      `🔍 ${colors.key}Ghost Content API Explorer - Colorful JSON Output${colors.reset}`
    );
    console.log("═".repeat(60));
    console.log(`\n${colors.key}Usage:${colors.reset}`);
    console.log(
      `  ${colors.string}pnpm content --key=API_KEY --url=GHOST_URL${colors.reset} ${colors.punctuation}[options]${colors.reset}`
    );
    console.log(`\n${colors.key}Required:${colors.reset}`);
    console.log(
      `  ${colors.key}--key, -k${colors.reset}       ${colors.string}Content API Key${colors.reset}`
    );
    console.log(
      `  ${colors.key}--url, -u${colors.reset}       ${colors.string}Ghost site URL${colors.reset}`
    );
    console.log(`\n${colors.key}Options:${colors.reset}`);
    console.log(
      `  ${colors.key}--resource, -r${colors.reset}  ${colors.string}Resource type: posts, pages, authors, tags, tiers, settings${colors.reset}`
    );
    console.log(
      `  ${colors.key}--limit, -l${colors.reset}     ${colors.string}Number of items to fetch (default: 5)${colors.reset}`
    );
    console.log(
      `  ${colors.key}--id, -i${colors.reset}        ${colors.string}Specific resource ID${colors.reset}`
    );
    console.log(
      `  ${colors.key}--slug, -s${colors.reset}      ${colors.string}Specific resource slug${colors.reset}`
    );
    console.log(
      `  ${colors.key}--include, -n${colors.reset}   ${colors.string}Include related resources (e.g., tags,authors)${colors.reset}`
    );
    console.log(
      `  ${colors.key}--fields, -f${colors.reset}    ${colors.string}Specific fields to include (e.g., title,slug,url)${colors.reset}`
    );
    console.log(
      `  ${colors.key}--filter, -t${colors.reset}    ${colors.string}Filter results (e.g., tag:news, author:john)${colors.reset}`
    );
    console.log(
      `  ${colors.key}--order, -o${colors.reset}     ${colors.string}Order results (e.g., published_at DESC, title ASC)${colors.reset}`
    );
    console.log(
      `  ${colors.key}--stats, -a${colors.reset}     ${colors.string}Show statistics about the response${colors.reset}`
    );
    console.log(
      `  ${colors.key}--help, -h${colors.reset}      ${colors.string}Show this help${colors.reset}`
    );
    console.log(`\n${colors.key}Examples:${colors.reset}`);
    console.log(
      `  ${colors.string}pnpm content --key=KEY --url=https://demo.ghost.io${colors.reset}`
    );
    console.log(
      `  ${colors.string}pnpm content -k KEY -u https://site.com -r posts -l 3${colors.reset}`
    );
    console.log(
      `  ${colors.string}pnpm content -k KEY -u https://site.com -r posts -s welcome --stats${colors.reset}`
    );
    console.log(
      `  ${colors.string}pnpm content -k KEY -u https://site.com -r posts --include=tags,authors${colors.reset}`
    );
  }

  async run() {
    const params = this.parseArgs();

    if (params.help || params.h) {
      this.showHelp();
      return;
    }

    if (!params.key && !params.k) {
      console.error(
        `❌ ${colors.string}Error: Content API Key is required (--key or -k)${colors.reset}`
      );
      this.showHelp();
      process.exit(1);
    }

    if (!params.url && !params.u) {
      console.error(
        `❌ ${colors.string}Error: Ghost site URL is required (--url or -u)${colors.reset}`
      );
      this.showHelp();
      process.exit(1);
    }

    const apiKey = params.key || params.k;
    const ghostUrl = (params.url || params.u).replace(/\/$/, "");
    const resourceType = params.resource || params.r || "posts";
    const limit = parseInt(params.limit || params.l || this.defaultLimit);
    const specificId = params.id || params.i;
    const specificSlug = params.slug || params.s;
    const showStats = params.stats || params.a;
    const include = params.include || params.n;
    const fields = params.fields || params.f;
    const filter = params.filter || params.t;
    const order = params.order || params.o;

    // Validate resource type
    const validResources = [
      "posts",
      "pages",
      "authors",
      "tags",
      "tiers",
      "settings",
    ];
    if (!validResources.includes(resourceType)) {
      console.error(
        `❌ ${colors.string}Error: Invalid resource type. Valid options: ${validResources.join(", ")}${colors.reset}`
      );
      process.exit(1);
    }

    try {
      console.log(
        `🔍 ${colors.key}Exploring Ghost Content API...${colors.reset}\n`
      );
      console.log(
        `   ${colors.key}Site:${colors.reset} ${colors.url}${ghostUrl}${colors.reset}`
      );
      console.log(
        `   ${colors.key}Resource:${colors.reset} ${colors.string}${resourceType}${colors.reset}`
      );

      let endpoint = resourceType;
      let requestParams = {};

      // Add optional parameters
      if (
        limit &&
        !specificId &&
        !specificSlug &&
        resourceType !== "settings"
      ) {
        requestParams.limit = limit.toString();
      }
      if (include) requestParams.include = include;
      if (fields) requestParams.fields = fields;
      if (filter) requestParams.filter = filter;
      if (order) requestParams.order = order;

      // Handle specific resource requests
      if (specificId) {
        endpoint = `${resourceType}/${specificId}`;
      } else if (specificSlug) {
        endpoint = `${resourceType}/slug/${specificSlug}`;
      }

      console.log(
        `   ${colors.key}Endpoint:${colors.reset} ${colors.string}${endpoint}${colors.reset}`
      );
      if (Object.keys(requestParams).length > 0) {
        console.log(
          `   ${colors.key}Parameters:${colors.reset} ${colors.string}${JSON.stringify(requestParams)}${colors.reset}`
        );
      }
      console.log("");

      const data = await this.makeRequest(
        endpoint,
        apiKey,
        ghostUrl,
        requestParams
      );
      this.printJsonResults(data, resourceType, showStats);
    } catch (error) {
      console.error(
        `❌ ${colors.string}Error:${colors.reset} ${error.message}`
      );
      process.exit(1);
    }
  }
}

// Execute the script
new GhostContentAPIExplorer().run().catch(console.error);
