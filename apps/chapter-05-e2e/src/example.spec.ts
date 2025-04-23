import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain a substring.
  expect(await page.locator('[data-testid="appTitle"]').innerText()).toContain(
    'Chapter 5'
  );
});
