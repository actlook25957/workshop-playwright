// @ts-check
const { test, expect } = require('@playwright/test');

test('has title @group1', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Mock API response', async ({ page }) => {
  // Intercept network requests
  await page.route('https://demo-backend-nodejs.vercel.app/**', route => {
    // Respond with a mock response
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Hello World with Mock' })
    });
  });

  await page.goto('https://demo-frontend-reactjs.vercel.app/');
  await page.waitForSelector('[data-testid="hello_text"]');
  const hello_text = await page.getByTestId('hello_text').textContent();
  expect(hello_text).toBe('Hello World with Mock');
});