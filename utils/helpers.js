class Helpers {
  static generateUniqueEmail() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `user_${timestamp}_${random}@testmail.com`;
  }

  static async waitForPageLoad(page, timeout = 10000) {
    await page.waitForLoadState("networkidle", { timeout });
    await page.waitForLoadState("domcontentloaded", { timeout });
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = Helpers;
