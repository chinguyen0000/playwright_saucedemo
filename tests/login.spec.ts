import { test, expect } from "@playwright/test";
import { login } from "../helpers/utils";

test("Login with valid credentials", async ({ page }) => {
    //Recording
    await login(page, "standard_user", "secret_sauce");
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");   //expect sẽ chuyển hướng sang trang này
    //console.log("hiện thông tin : "+ await page.locator(".inventory_item").count());
    expect(await page.locator(".inventory_item").count()).toBeGreaterThan(0);   //expect số lượng các class inventory_item sẽ lớn hơn 0
});

test("Login with invalid credentials and receive error message", async ({ page }) => {
    //Recording
    await login(page, "wrong", "wrong");
    
    const errorMsg = page.locator('[data-test = "error"]');
    
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText("Epic sadface: Username and password do not match any user in this service");
});

test("Login with locked out user and receive error message", async ({ page }) => {
    //Recording
    await login(page, "locked_out_user", "secret_sauce");
    
    const errorMsg = page.locator('[data-test = "error"]');
    
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText("locked out");
});