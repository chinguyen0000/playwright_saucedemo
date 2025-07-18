import { test, expect } from "@playwright/test";
import { login, addFirstItemToCart, goToCheckout } from "../helpers/utils";
import fs from 'fs';

test.beforeEach(async ({ page }) => {
    await login(page, "standard_user", "secret_sauce");
});

//testInfo là object đặc biệt cung cấp thông tin và API liên quan đến test hiện tại (dùng để gắn file vào report).
test("Pay successfully after adding item to cart", async ({ page }, testInfo) => {      
    // const firstProduct = page.locator(".inventory_item").filter({ hasText: "Sauce Labs Backpack"});
    // const addBtn = firstProduct.locator("button");
    // await addBtn.click();
    await addFirstItemToCart(page);

    // await page.click(".shopping_cart_link");
    // await expect(page).toHaveURL(/.*cart.html/);

    // await page.locator('[data-test = "checkout"]').click();
    // await expect(page).toHaveURL(/.*checkout-step-one.html/);
    await goToCheckout(page);

    await page.locator("#first-name").fill("John");
    await page.locator("#last-name").fill("Doe");
    await page.locator("#postal-code").fill("70000");

    await page.locator("#continue").click();
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await page.locator('[data-test="cart-list"]').screenshot({ path: 'screenshots/checkout/successful_payment.png' }); //lưu trong se
    // Đính kèm ảnh trực tiếp vào report
    await testInfo.attach('Ảnh chụp màn hình 1', {
        path: 'screenshots/checkout/successful_payment.png',
        contentType: 'image/png',
    });

    await page.locator("#finish").click();
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    await expect(page.getByRole("heading", { name: "Thank you for your order!" })).toBeVisible();
    await page.screenshot({ path: "screenshots/checkout/successful_order.png" });
    await testInfo.attach('Ảnh chụp màn hình 2', {
        path: 'screenshots/checkout/successful_order.png',
        contentType: 'image/png',
    });
});

test("Do not fill information when checking out", async ({ page }) => {
    await addFirstItemToCart(page);

    await goToCheckout(page);

    await page.locator("#continue").click();
    await expect(page.getByRole("heading", { name: "Error: First Name is required" })).toBeVisible();
    await page.screenshot({ path: "screenshots/checkout/error_message_not_checkout.png" });
});

