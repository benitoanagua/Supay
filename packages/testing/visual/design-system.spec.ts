import { test, expect } from '@playwright/test';

test.describe('STRATA visual contracts', () => {
  test('scale law presentation is available', async ({ page }) => {
    await page.goto('/?path=/story/foundations-scale-law--structural-weight');
    await expect(page.getByText('Physical scale determines structural weight.')).toBeVisible();
    const surfaces = page.locator('strata-surface');
    await expect(surfaces).toHaveCount(5);
  });

  test('spectrum exposes exactly seven semantic families', async ({ page }) => {
    await page.goto('/?path=/story/foundations-spectrum--semantic');
    await expect(page.locator('strata-badge')).toHaveCount(7);
  });

  test('components use Carbon icons directly', async ({ page }) => {
    await page.goto('/?path=/story/components-overview--catalog');
    const icons = page.locator('iconify-icon');
    const count = await icons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i += 1) {
      await expect(icons.nth(i)).toHaveAttribute('icon', /^carbon:/);
    }
  });
});
