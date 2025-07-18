// @ts-check
import { test, expect } from "@playwright/test";

test("Login with valid credentials", async ({ page }) => {
    //Recording
    await page.goto("https://www.saucedemo.com/");  //đi tới trang web
    await page.getByPlaceholder("Username").fill("standard_user");    //nhập visual_user ở ô input có placeholder là Username
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();  //nhấn nút Login

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");   //expect sẽ chuyển hướng sang trang này
    console.log("hiện thông tin : "+ await page.locator(".inventory_item").count());
    expect(await page.locator(".inventory_item").count()).toBeGreaterThan(0);   //expect số lượng các class inventory_item sẽ lớn hơn 0
});

test("Login with invalid credentials and receive error message", async ({ page }) => {
    //Recording
    await page.goto("https://www.saucedemo.com/");  //đi tới trang web
    await page.getByPlaceholder("Username").fill("wrong");    
    await page.getByPlaceholder("Password").fill("wrong");
    await page.getByRole("button", { name: "Login" }).click();  //nhấn nút Login

    const errorMsg = page.locator('[data-test = "error"]');
    
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText("Epic sadface: Username and password do not match any user in this service");
});

test("Login with locked out user and receive error message", async ({ page }) => {
    //Recording
    await page.goto("https://www.saucedemo.com/");  //đi tới trang web
    await page.getByPlaceholder("Username").fill("locked_out_user");    
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();  //nhấn nút Login

    const errorMsg = page.locator('[data-test = "error"]');
    
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText("locked out");
});