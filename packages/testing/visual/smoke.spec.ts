import { test, expect } from '@playwright/test';

test('Storybook loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Storybook/i);
});

test('STRATA introduction is renderable', async ({ page }) => {
  await page.goto('/iframe.html?id=introduction-strata-design-system--overview&viewMode=story');
  await expect(page.locator('body')).toContainText('STRATA');
});

test('Carbon icon collection renders locally', async ({ page }) => {
  await page.goto('/iframe.html?id=components-overview--catalog&viewMode=story');
  const icon = page.locator('iconify-icon[icon="carbon:add"]').first();
  await expect(icon).toBeVisible();
});
