/**
 * Existing User E2E Flow Test
 *
 * Why this flow is important:
 * - Returning users form the core of repeat business and require a frictionless login
 * - Validates that existing credentials, saved cart state, and checkout work correctly
 * - Regression testing ensures login changes don't break the purchase flow
 * - Covers the typical "returning customer" journey
 *
 * Note: The test first registers a user dynamically, then uses those same credentials
 * in a separate session to simulate the "existing user" login flow.
 * If you have pre-existing valid credentials, replace the register step with direct login.
 */

const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const RegisterPage = require("../pages/RegisterPage");
const DashboardPage = require("../pages/DashboardPage");
const CartPage = require("../pages/CartPage");
const Helpers = require("../utils/helpers");
const Logger = require("../utils/logger");
const testData = require("../test-data/testData.json");

test.describe("Existing User - Complete E2E Flow @existingUser", () => {
  let loginPage, registerPage, dashboardPage, cartPage;
  const userCredentials = {
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
  
};

// console.log("Existing user email:", userCredentials.email);
// console.log("Existing user password:", userCredentials.password);

  test.beforeAll(async ({ browser }) => {
    // Register a user first to have valid "existing" credentials
    const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
    const page = await context.newPage();
    registerPage = new RegisterPage(page);

    const email = Helpers.generateUniqueEmail();

  userCredentials.email = email;
  userCredentials.password = testData.newUser.password;

  await registerPage.goTo();
  await registerPage.registerUser({
    ...testData.newUser,
    email: email,
  });

  await registerPage.verifyRegistrationSuccess();
  await context.close();
});

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    cartPage = new CartPage(page);
  });

  test("should complete full E2E flow for an existing user", async ({ page }) => {
    Logger.step(1, "Open application and login with existing credentials");
    await loginPage.goTo();
    await loginPage.login(userCredentials.email, userCredentials.password);
    await loginPage.verifyLoginSuccess();

    Logger.step(2, "Search for a product");
    await dashboardPage.searchProduct(testData.product.searchTerm);

    const productCount = await dashboardPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    Logger.info(`Found ${productCount} product(s)`);

    Logger.step(3, "Add product to cart");
    const productName = await dashboardPage.getFirstProductName();
    Logger.info(`Adding product: ${productName}`);
    await dashboardPage.addFirstProductToCart();
    await dashboardPage.verifyProductAddedToCart();

    Logger.step(4, "Navigate to cart and verify the product");
    await dashboardPage.navigateToCart();
    await cartPage.verifyProductInCart(productName);
    await cartPage.verifyCartSummary();

    Logger.step(5, "Proceed to checkout and verify order page");
    await cartPage.proceedToCheckout();
    await cartPage.verifyOrderPage();

    Logger.step(6, "Return to dashboard and logout");
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash", { waitUntil: "networkidle" });
    await dashboardPage.waitForDashboard();
    await dashboardPage.logout();
  });
});
