import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("STRATA component stories have no critical accessibility violations", async ({
  page,
}) => {
  test.setTimeout(120_000);
  const response = await page.request.get("/index.json");
  expect(response.ok()).toBeTruthy();

  const index = await response.json();
  const stories = Object.values(
    index.entries as Record<
      string,
      { id: string; type: string; title?: string }
    >,
  )
    .filter(
      (entry) => entry.type === "story" && entry.id.startsWith("components-"),
    )
    .sort((a, b) => a.id.localeCompare(b.id));

  expect(stories.length).toBeGreaterThan(0);

  for (const story of stories) {
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page }).analyze();
    const critical = results.violations.filter(
      (violation) => violation.impact === "critical",
    );
    expect(
      critical,
      `${story.id}\n${critical.map((violation) => `${violation.id}: ${violation.help}`).join("\n")}`,
    ).toHaveLength(0);
  }
});
