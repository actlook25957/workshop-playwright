// @ts-check
const { test, expect } = require('@playwright/test');

test('ผู้ใช้งานทำการค้นหาคำว่าหวย แล้วจะต้องเจอผลการค้นหาตาม req', async ({ page }) => {
  await page.goto('https://www.google.com/');

  // type into search box.
  const search = await page.locator('#APjFqb')
  // await page.locator('textarea[name=q]').fill('หวย');
  await search.fill('หวย');
  await page.keyboard.press('Enter')

  // await expect(page.locator('#result-stats')).toHaveText(/ผลการค้นหาประมาณ/);
  await expect(page.locator('#result-stats'))
  .toHaveText(/ผลการค้นหาประมาณ \d{1,3},\d{3},\d{3} รายการ \(\d{1,2}\.\d{1,2} วินาที\)/);

});

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByLabel('ค้นหา', { exact: true }).click();
  await page.getByLabel('ค้นหา', { exact: true }).fill('หวย');
});

test('ผู้ใช้งานทำการค้นหาคำว่าหวย แล้วจะต้องเจอผลการค้นหาตาม req by step', async ({ page }) => {
  // Step 1 :: go to search page.
  await test.step('Step 1 :: go to search page', async () => {
    await page.goto('https://www.google.com/');
  });

  await test.step('Step 2 :: Type into search box', async () => {
    const seachField = page.locator('#APjFqb');
    await seachField.fill('หวย');
    await seachField.press('Enter');
  });

  await test.step('Step 3 :: Assert text in id=result-stats', async () => {
    // Assert "ผลการค้นหาประมาณ 101,000,000 รายการ (0.36 วินาที)"
    // Step 3 :: Assert text in id=result-stats
    await expect(page.locator('#result-stats')).toHaveText(/ผลการค้นหาประมาณ/);
    await expect(page.locator('#result-stats')).toHaveText(/รายการ/);
    await expect(page.locator('#result-stats')).toHaveText(/วินาที/);

    // Assert with regular expression ผลการค้นหาประมาณ 101,000,000 รายการ (0.36 วินาที)
    await expect(page.locator('#result-stats'))
      .toHaveText(/ผลการค้นหาประมาณ \d{1,3},\d{3},\d{3} รายการ \(\d{1,2}\.\d{1,2} วินาที\)/);

  });
});
