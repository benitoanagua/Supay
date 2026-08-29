import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('STRATA introduction has no critical accessibility violations', async ({ page }) => {
  await page.goto('/iframe.html?id=introduction-strata-design-system--overview&viewMode=story');
  const results = await new AxeBuilder({ page }).analyze();
  const critical = results.violations.filter((v) => v.impact === 'critical');
  expect(critical, critical.map((v) => `${v.id}: ${v.help}`).join('\n')).toHaveLength(0);
});
