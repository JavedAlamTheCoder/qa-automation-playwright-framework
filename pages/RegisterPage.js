const BasePage = require("./BasePage");
const { expect } = require("@playwright/test");

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = "#firstName";
    this.lastNameInput = "#lastName";
    this.emailInput = "#userEmail";
    this.phoneInput = "#userMobile";
    this.occupationSelect = "select";
    this.genderRadios = "input[type='radio']";
    this.passwordInput = "#userPassword";
    this.confirmPasswordInput = "#confirmPassword";
    this.ageCheckbox = "input[type='checkbox']";
    this.registerButton = "#login";
    this.successMessage = "text=Account Created Successfully";
    this.loginAfterRegister = "button:has-text('Login')";
  }

  async goTo() {
    await this.navigate("https://rahulshettyacademy.com/client/#/auth/register");
    await this.waitForElement(this.firstNameInput);
  }

  async registerUser(userDetails) {
    await this.fillInput(this.firstNameInput, userDetails.firstName);
    await this.fillInput(this.lastNameInput, userDetails.lastName);
    await this.fillInput(this.emailInput, userDetails.email);
    await this.fillInput(this.phoneInput, userDetails.phone);

    await this.page.selectOption(this.occupationSelect, userDetails.occupation);

    if (userDetails.gender === "Male") {
      await this.page.locator(this.genderRadios).first().click();
    } else {
      await this.page.locator(this.genderRadios).nth(1).click();
    }

    await this.fillInput(this.passwordInput, userDetails.password);
    await this.fillInput(this.confirmPasswordInput, userDetails.password);
    await this.page.locator(this.ageCheckbox).check();
    await this.click(this.registerButton);
  }

  async verifyRegistrationSuccess() {
    await expect(this.page.locator(this.successMessage)).toBeVisible({ timeout: 10000 });
  }

  async clickLoginAfterRegister() {
    await this.click(this.loginAfterRegister);
    await this.waitForElement(this.emailInput);
  }
}

module.exports = RegisterPage;
