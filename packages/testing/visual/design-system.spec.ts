import { test, expect } from '@playwright/test';

test.describe('STRATA visual contracts', () => {
  test('scale law presentation is available', async ({ page }) => {
    await page.goto('/iframe.html?id=foundations-scale-law--structural-weight&viewMode=story');
    await expect(page.getByText('Physical scale determines structural weight.')).toBeVisible();
    const surfaces = page.locator('strata-surface');
    await expect(surfaces).toHaveCount(5);
  });

  test('spectrum exposes exactly seven semantic families', async ({ page }) => {
    await page.goto('/iframe.html?id=foundations-spectrum--semantic&viewMode=story');
    await expect(page.locator('strata-badge')).toHaveCount(7);
  });

  test('components use Carbon icons directly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-overview--catalog&viewMode=story');
    const icons = page.locator('iconify-icon');
    await expect(icons.first()).toBeVisible();
    const count = await icons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i += 1) {
      await expect(icons.nth(i)).toHaveAttribute('icon', /^carbon:/);
    }
  });
});
