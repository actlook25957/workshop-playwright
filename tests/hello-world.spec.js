const { test, expect } = require("@playwright/test");

test("เข้าสู่หน้าเว็ปแล้วพบคำว่า Call REST API", async ({ page }) => {
  await page.goto("https://demo-frontend-reactjs.vercel.app/");
  await expect(page.getByTestId("message_text")).toHaveText(/Call REST API/);
});

test("เข้าสู่หน้าเว็ปแล้วพบคำว่า Hello World!", async ({ page }) => {
  
  await page.goto("https://demo-frontend-reactjs.vercel.app/");
  await expect(page.getByTestId("hello_text")).toHaveText(/Hello World!/);
});

test("เข้าสู่หน้าเว็ปแล้วพบคำว่า Hello World! with mock", async ({ page }) => {
    // Intercept network requests
    await page.route('https://demo-backend-nodejs.vercel.app/**', route => {
      // Respond with a mock response
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Hello World with Mock' })
      });
    });
  await page.goto("https://demo-frontend-reactjs.vercel.app/");
  await expect(page.getByTestId("hello_text")).toHaveText(/Hello World with Mock/);
});
