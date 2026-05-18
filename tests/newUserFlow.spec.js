/**
 * New User E2E Flow Test
 *
 * Why this flow is important:
 * - First-time user experience is critical for conversion and user retention
 * - Validates the complete registration pipeline: sign-up → login → browse → purchase
 * - Ensures newly created accounts can seamlessly navigate the shopping experience
 * - Covers the full "happy path" a new customer would take
 */

const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const RegisterPage = require("../pages/RegisterPage");
const DashboardPage = require("../pages/DashboardPage");
const CartPage = require("../pages/CartPage");
const Helpers = require("../utils/helpers");
const Logger = require("../utils/logger");
const testData = require("../test-data/testData.json");

test.describe("New User - Complete E2E Flow @newUser", () => {
  let loginPage, registerPage, dashboardPage, cartPage;
  const userDetails = { ...testData.newUser };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
    dashboardPage = new DashboardPage(page);
    cartPage = new CartPage(page);
    userDetails.email = Helpers.generateUniqueEmail();
  });

  test("should complete full E2E flow for a newly registered user", async ({ page }) => {
    Logger.step(1, "Open application and navigate to Register page");
    await loginPage.goTo();
    await loginPage.navigateToRegister();

    Logger.step(2, "Register a new user with dynamically generated email");
    await registerPage.registerUser(userDetails);

    Logger.step(3, "Verify successful registration");
    await registerPage.verifyRegistrationSuccess();

    Logger.step(4, "Login after registration");
    await registerPage.clickLoginAfterRegister();
    await loginPage.login(userDetails.email, userDetails.password);
    await loginPage.verifyLoginSuccess();

    Logger.step(5, "Search for a product");
    await dashboardPage.searchProduct(testData.product.searchTerm);

    Logger.step(6, "Add product to cart");
    const productName = await dashboardPage.getFirstProductName();
    Logger.info(`Adding product: ${productName}`);
    await dashboardPage.addFirstProductToCart();
    await dashboardPage.verifyProductAddedToCart();

    Logger.step(7, "Navigate to cart and verify product");
    await dashboardPage.navigateToCart();
    await cartPage.verifyProductInCart(productName);
    await cartPage.verifyCartSummary();

    Logger.step(8, "Proceed to checkout");
    await cartPage.proceedToCheckout();
    await cartPage.verifyOrderPage();

    Logger.step(9, "Return to dashboard and logout");
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash", { waitUntil: "networkidle" });
    await dashboardPage.waitForDashboard();
    await dashboardPage.logout();
  });
});
