const BasePage = require("./BasePage");
const { expect } = require("@playwright/test");

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = ".card";
    this.cartProductName = "text=ADIDAS ORIGINAL";
    this.checkoutButton = "button:has-text('Checkout')";
    this.continueShopping = "button:has-text('Continue Shopping')";
    this.placeOrderLink = "a:has-text('Place Order')";
    this.subtotalLabel = ""; // Using getByText exact match in method
  }

  async waitForCartPage() {
    await this.assertPageContainsUrl("/cart");
    await this.waitForElement(this.checkoutButton);
  }

  async verifyProductInCart(productName) {
    await expect(this.page.locator(`text=${productName}`).first()).toBeVisible({ timeout: 10000 });
  }

  async verifyCartSummary() {
    await expect(this.page.locator("text=SUBTOTAL").first()).toBeVisible();
    await expect(this.page.locator("text=TOTAL").last()).toBeVisible();
  }

  async proceedToCheckout() {
    await this.click(this.checkoutButton);
    await this.waitForElement(this.placeOrderLink);
  }

  async verifyOrderPage() {
    await this.assertPageContainsUrl("/order");
    await expect(this.page.locator(this.placeOrderLink).first()).toBeVisible({ timeout: 10000 });
  }
}

module.exports = CartPage;
