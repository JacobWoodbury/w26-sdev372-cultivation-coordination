import { test, expect } from '@playwright/test';

test('user can reload and see saved plots', async ({ page }) => {

  await page.goto('/');

  await page.reload();

  await expect(page.getByText('Playwright Plot')).toBeVisible();

});