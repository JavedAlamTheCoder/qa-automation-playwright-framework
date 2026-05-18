const BasePage = require("./BasePage");
const { expect } = require("@playwright/test");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = "#userEmail";
    this.passwordInput = "#userPassword";
    this.loginButton = "#login";
    this.registerLink = "a[href*='register']";
    this.toastMessage = "#toast-container";
  }

  async goTo() {
    await this.navigate("https://rahulshettyacademy.com/client/#/auth/login");
    await this.waitForElement(this.emailInput);
  }

  async login(email, password) {
    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.passwordInput, password);
    await this.click(this.loginButton);
    await expect(this.page.locator(".card").first()).toBeVisible({ timeout: 15000 });
     await this.page.locator(".card").first().waitFor({
        state: "visible",
        timeout: 15000
    });
  }

 async verifyLoginSuccess() {
  await expect(this.page.locator("text=Login Successfully")).toBeVisible({ timeout: 10000 });
  await expect(this.page.locator(".card").first()).toBeVisible({ timeout: 10000 });
  await expect(this.page.locator("button:has-text('Sign Out')")).toBeVisible({ timeout: 10000 });
}

  async navigateToRegister() {
    await this.click(this.registerLink);
    await this.waitForElement("#firstName");
  }
}

module.exports = LoginPage;
