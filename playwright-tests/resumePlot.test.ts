import { test, expect } from '@playwright/test';

test('user can see saved plots', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'New plot' }).click();
  await page.getByRole('dialog').getByPlaceholder('Plot Name').fill('Playwright Plot');
  await page.getByRole('dialog').getByPlaceholder('Plot Description').fill('Playwright Test');
  await page.getByRole('dialog').getByPlaceholder('Length (ft)').fill('2');
  await page.getByRole('dialog').getByPlaceholder('Width (ft)').fill('2');
  await page.getByRole('dialog').getByRole('button', { name: 'Create plot' }).click();
  await expect(page.getByRole('dialog')).toBeHidden();

  // Plot list is collapsible in the toolbar.
  await page.getByRole('button', { name: 'My Plots' }).click();
  await expect(page.getByRole('button', { name: 'Playwright Plot' })).toBeVisible();

  await page.getByRole('button', { name: 'Delete Plot' }).click()
});