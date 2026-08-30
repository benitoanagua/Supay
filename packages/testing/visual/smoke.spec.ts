import { waitForStoryReady } from "./story-ready.js";
import { test, expect } from "@playwright/test";

test("Storybook loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Storybook/i);
});

test("STRATA introduction is renderable", async ({ page }) => {
  await page.goto(
    "/iframe.html?id=introduction-strata-design-system--overview&viewMode=story",
  );
  await expect(page.locator("body")).toContainText("STRATA");
});

test("Carbon icon collection renders locally", async ({ page }) => {
  await page.goto(
    "/iframe.html?id=components-overview--catalog&viewMode=story",
  );
  const icon = page.locator('iconify-icon[icon="carbon:add"]').first();
  await expect(icon).toBeVisible();
});


test("Web Components render their Shadow DOM content", async ({ page }) => {
  await page.goto("/iframe.html?id=components-buttongroup--default&viewMode=story");
  await waitForStoryReady(page);
  const group = page.locator("strata-button-group");
  await expect(group).toBeVisible();
  await expect(group.locator(".strata-control-group")).toBeVisible();
  await expect(group.locator("strata-button")).toHaveCount(3);
});

test("Tabs render through the Web Components renderer", async ({ page }) => {
  await page.goto("/iframe.html?id=components-tabs--structural&viewMode=story");
  await waitForStoryReady(page);
  const tabs = page.locator("strata-tabs");
  await expect(tabs).toBeVisible();
  await expect(tabs.locator("strata-tab")).toHaveCount(3);
  await expect(tabs.locator("strata-tab-panel")).toHaveCount(3);
});
