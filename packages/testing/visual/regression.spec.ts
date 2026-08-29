import { test, expect } from '@playwright/test';

const stories = [
  ['introduction-strata-design-system--overview', 'introduction'],
  ['foundations-scale-law--structural-weight', 'scale-law'],
  ['components-overview--catalog', 'component-catalog'],
] as const;

test.describe('STRATA visual regression', () => {
  for (const [story, snapshot] of stories) {
    test(snapshot, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.strata-story-frame')).toHaveScreenshot(`${snapshot}.png`, { fullPage: true });
    });
  }
});
