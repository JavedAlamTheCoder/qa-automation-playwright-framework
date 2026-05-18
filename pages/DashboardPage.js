const BasePage = require("./BasePage");
const { expect } = require("@playwright/test");

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = "#sidebar input[name='search']";
    this.productCards = ".card";
    this.productName = ".card h5 b";
    this.addToCartButton = ".card button:has-text('Add To Cart')";
    this.cartNav = "[routerlink='/dashboard/cart']";
    this.signOutButton = "button:has-text('Sign Out')";
    this.cartBadge = "li:has-text('Cart') label";
  }

  async waitForDashboard() {
    await this.assertPageContainsUrl("/dashboard");
    await this.waitForElement(this.productCards);
  }

  async searchProduct(searchTerm) {
    await this.fillInput(this.searchInput, searchTerm);
    await this.page.waitForTimeout(2000);
  }

  async getProductCount() {
    return await this.page.locator(this.productCards).count();
  }

  async getProductNames() {
    return await this.page.locator(this.productName).allInnerTexts();
  }

  async getFirstProductName() {
    return await this.page.locator(this.productName).first().innerText();
  }

  async addFirstProductToCart() {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (resp) => resp.url().includes("add-to-cart") && resp.status() === 200,
        { timeout: 15000 }
      ),
      this.page.locator(this.addToCartButton).first().click(),
    ]);
    const responseBody = await response.json();
    expect(responseBody.message).toContain("Product Added To Cart");
    return responseBody;
  }

  async verifyProductAddedToCart() {
    await expect(this.page.locator(this.cartBadge).first()).toBeVisible({ timeout: 5000 });
  }

  async navigateToCart() {
    await this.click(this.cartNav);
    await this.assertPageContainsUrl("/cart");
  }

  async navigateToDashboard() {
    await this.click("button:has-text('HOME')");
    await this.waitForElement(this.productCards);
  }

  async logout() {
    await this.click(this.signOutButton);
    await this.assertPageContainsUrl("/auth/login");
  }
}

module.exports = DashboardPage;
