# 🎯 Playwright Automation Project – SauceDemo

This is a practice automation testing project using [Playwright](https://playwright.dev/) and TypeScript to test the core functionalities of the [SauceDemo](https://www.saucedemo.com/) e-commerce demo site.

## 📌 Project Objectives

- Practice UI test automation using Playwright framework.
- Apply Page Object Model (POM) to separate test logic from UI elements.
- Validate login functionality (valid/invalid).
- Test product selection, cart operations, and successful checkout flow.
- Use reusable test data and structure tests for maintainability.

## 🧰 Tech Stack

- **Framework**: [Playwright](https://playwright.dev/)
- **Language**: TypeScript
- **Test Runner**: Playwright Test
- **Reports**: Playwright HTML report *(built-in)*

---

## 📁 Folder Structure

playwright_saucedemo/
├── tests/ # Test scenarios
│ ├── login.spec.ts
│ ├── cart.spec.ts
│ └── checkout.spec.ts
├── utils/ # Utility/helper functions (to be added if needed)
├── playwright.config.ts # Playwright configuration
├── package.json
└── README.md

## 🚀 Getting Started

### 1. 📦 Install dependencies

```bash
npm install
```

### 2. ▶️ Run all tests

```bash
npx playwright test
```

### 3. 📄 Show HTML report (after test run)

```bash
npx playwright show-report
```
## 🧪 Test Scenarios Covered

### ✅ Login Tests:
 - Login with valid username & password
 - Login with invalid username
 - Login with invalid password
 - Login with empty fields
 - Check error messages when login fails

### 🛒 Order/Checkout Tests:
 - Add single product to cart and checkout
 - Add multiple products and verify total
 - Remove item from cart before checkout
 - Complete checkout successfully