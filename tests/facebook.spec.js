import { test, expect } from '@playwright/test';

test('Post Hello Playwright onfacebook', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  await page.getByTestId('royal_email').click();
  await page.getByTestId('royal_email').fill('actlookfororigin@gmail.ocn');
  await page.getByTestId('royal_pass').click();
  await page.getByTestId('royal_pass').fill('lookKmutt@25957');
  await page.getByTestId('royal_login_button').click();
  await page.getByRole('link', { name: 'Facebook' }).click();
  await page.getByRole('button', { name: 'What\'s on your mind,' }).click();
  await page.getByLabel('What\'s on your mind,').fill('Hello Playwright!!');
  await page.getByLabel('Post', { exact: true }).click();
});