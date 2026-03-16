import { test, expect } from '@playwright/test';

test('user can see saved plots', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Plot Name').fill('Playwright Plot');
  await page.getByPlaceholder('Plot Description').fill('Playwright Test');
  await page.getByPlaceholder('Length (ft)').fill('2');
  await page.getByPlaceholder('Width (ft)').fill('2');
  await page.getByRole('button', { name: 'Add Plot' }).click();

  await expect(page.getByText('Playwright Plot')).toBeVisible();
});