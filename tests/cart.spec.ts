import { test, expect } from "@playwright/test";
import { login } from "../helpers/utils";

test.beforeEach(async ({ page }) => {
    await login(page, "standard_user", "secret_sauce");
});

test("Add item to cart and verify display", async ({ page }) => {
    const firstProduct = page.locator(".inventory_item").filter({ hasText: "Sauce Labs Backpack"});
    const addBtn = firstProduct.locator("button");
    await addBtn.click();

    await expect(addBtn).toHaveText("Remove");

    await page.click(".shopping_cart_link");
    await expect(page).toHaveURL(/.*cart.html/);

    //console.log("Số lượng item trong giỏ: " + await page.locator(".cart_item").count());
    expect(await page.locator(".cart_item").count()).toEqual(1);

});

