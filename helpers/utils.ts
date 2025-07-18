import { Page, expect } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
}

export async function addFirstItemToCart(page: Page) {
  const firstAddBtn = page.getByRole('button', { name: 'Add to cart' }).first();
  await firstAddBtn.click();
}

export async function goToCheckout(page: Page) {
  await page.locator('#shopping_cart_container').click();
  await expect(page).toHaveURL(/.*cart.html/);
  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/.*checkout-step-one.html/);
}
