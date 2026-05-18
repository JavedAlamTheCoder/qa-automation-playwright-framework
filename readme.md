# QA Automation Framework - Playwright + JavaScript

## Project Overview

This repository contains a professional-quality end-to-end (E2E) automation framework built with **Playwright** and **JavaScript**, following the **Page Object Model (POM)** design pattern. It tests the Rahul Shetty Academy E-Commerce practice application covering both **new user registration** and **existing user login** flows.

### Key Features

- Page Object Model (POM) for maintainable and reusable code
- Two complete E2E test suites (new user & existing user)
- Dynamic unique email generation for registration
- Data-driven testing using external JSON test data
- Automatic screenshots, video, and trace capture on failure
- Playwright auto-waiting (no hardcoded sleeps)
- GitHub Actions CI/CD integration
- Comprehensive HTML reporting

---

## Tools & Versions

| Tool          | Version  |
|---------------|----------|
| Node.js       | ^24.11.1 |
| Playwright    | ^1.60.0  |
| VS Code       | Latest   |
| npm           | Latest   |

---

## Setup Steps

### Prerequisites

- Node.js (v18 or higher) installed
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd <project-folder>

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

---

## How to Run Tests

```bash
# Run all tests (headless)
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run only new user flow
npm run test:new-user

# Run only existing user flow
npm run test:existing-user

# Run in debug mode
npm run test:debug

# View HTML report after test run
npm run report
```

---

## Folder Structure

```
project-root/
├── .github/
│   └── workflows/
│       └── playwright-tests.yml    # GitHub Actions CI pipeline
│
├── config/
│   └── config.js                    # Framework configuration (URLs, credentials, timeouts)
│
├── pages/
│   ├── BasePage.js                  # Base page class with common methods
│   ├── LoginPage.js                 # Login page object
│   ├── RegisterPage.js              # Registration page object
│   ├── DashboardPage.js             # Dashboard / product listing page object
│   └── CartPage.js                  # Cart and checkout page object
│
├── test-data/
│   └── testData.json                # External test data (credentials, messages, search terms)
│
├── tests/
│   ├── newUserFlow.spec.js          # E2E test: new user registration → purchase → logout
│   └── existingUserFlow.spec.js     # E2E test: existing user login → purchase → logout
│
├── utils/
│   ├── helpers.js                   # Utility functions (email generation, etc.)
│   └── logger.js                    # Simple step-by-step logging
│
├── playwright.config.js             # Playwright configuration (viewport, timeouts, reporters)
├── package.json                     # Project dependencies and scripts
├── Manual_Test_Scenarios.md         # Manual test scenarios for Task 2
└── README.md                        # This file
```

---

## Test Scenarios Covered

### 1. New User Flow (@newUser)
- Open application → Register → Verify registration → Login after registration → Search product → Add to cart → Verify cart → Checkout → Logout

### 2. Existing User Flow (@existingUser)
- Open application → Login with existing credentials → Verify login → Search product → Add to cart → Verify cart → Checkout → Logout

---

## Assumptions

Assumption: Since the provided existing user credentials were not valid during manual validation, the existing user flow dynamically registers a user during setup and then logs in with the same account.

1. The application URL is stable and functional.
2. The application does not have CAPTCHA or bot detection that interferes with automation.
3. Network connectivity is available to access the application and its API.
4. The existing user flow dynamically registers a user before testing login, since the provided static credentials were not valid during validation. To use pre-existing credentials, update testData.json with valid values and modify the existingUserFlow.spec.js to skip the beforeAll registration step.
5. Test data in `testData.json` can be modified to support different environments.
6. The viewport width of 1400px is sufficient to render all UI elements without responsive hiding.
7. The "ADIDAS ORIGINAL" product is always available on the dashboard for adding to cart.
8. Failed tests retain trace, screenshot, and video files for debugging in `test-results/`.
9. The order page has a `div.payment` overlay that intercepts nav bar clicks; the test navigates via URL directly to the dashboard before logout to avoid this.

---

## AI Tools Usage

### AI Tools Used
- **ChatGPT (OpenAI)** - Assisted in generating initial test case outlines, improving locator strategies, and drafting the README structure.
- **Claude (Anthropic)** - Helped design the Page Object Model architecture, wrote assertion helpers, and structured the manual test scenarios document.
- **GitHub Copilot** - Used during VS Code for real-time code completion of page objects, locator suggestions, and boilerplate test spec generation.

### How AI Was Used
- **Generating Test Cases:** AI helped brainstorm edge cases and structure the E2E flows into logical step-by-step test scenarios.
- **Improving Locators:** AI suggested more robust selectors (e.g., using `[routerlink]` attributes over fragile CSS classes) and recommended Playwright-specific APIs like `waitForResponse`.
- **Writing Assertions:** AI proposed meaningful assertion points at each step (URL checks, visibility, text content, API response validation).
- **README Drafting:** AI generated the initial README template and folder structure documentation, which was then refined manually.

### One Useful AI Output
> "Use `page.waitForResponse()` when adding items to cart to synchronise with the API call rather than relying on arbitrary timeouts. This makes the test faster and more reliable."

### One AI Output That Needed Correction
> The AI initially suggested `app-card` as a custom Angular component selector, but the actual rendered DOM uses a regular `.card` div without an Angular component tag. The locators had to be updated from `app-card` to `.card` after inspecting the real DOM structure.

---

## License

This project is created for educational and interview demonstration purposes.
