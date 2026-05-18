const { expect } = require("@playwright/test");

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url, { waitUntil: "networkidle" });
  }

  async fillInput(locator, value) {
    await this.page.locator(locator).fill(value);
  }

  async click(locator) {
    await this.page.locator(locator).first().click();
  }

  async getText(locator) {
    return await this.page.locator(locator).first().innerText();
  }

  async waitForElement(locator, timeout = 10000) {
    await this.page.locator(locator).first().waitFor({ state: "visible", timeout });
  }

  async isElementVisible(locator) {
    try {
      return await this.page.locator(locator).first().isVisible();
    } catch {
      return false;
    }
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async assertTextVisible(text, timeout = 10000) {
    await expect(this.page.locator(`text=${text}`).first()).toBeVisible({ timeout });
  }

  async assertPageContainsUrl(substring) {
    expect(this.page.url()).toContain(substring);
  }
}

module.exports = BasePage;
