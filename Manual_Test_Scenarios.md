# Manual Test Scenarios - E-Commerce Application

## Task 2: Manual Test Scenario Design

Below are detailed manual test scenarios covering the **Existing User Flow** for the Rahul Shetty Academy E-Commerce application.

---

## Test Suite: Existing User E2E Flow

### Test Case ID: TC_EU_001
**Title:** Verify successful login with valid existing credentials

| Section        | Details |
|----------------|---------|
| **Precondition** | User is registered and has valid credentials |
| **Test Data** | Email: testinguser398@gmail.com, Password: Javed@778 |
| **Steps** | 1. Open browser and navigate to `https://rahulshettyacademy.com/client/#/auth/login`<br>2. Enter email in the Email field<br>3. Enter password in the Password field<br>4. Click "Login" button |
| **Expected Result** | User is redirected to the dashboard page. Product listing is visible with cards showing items like "ADIDAS ORIGINAL", "ZARA COAT 3", etc. Navigation bar shows HOME, ORDERS, Cart, and Sign Out options. |
| **Actual Result** | |
| **Status** | Pass / Fail |
| **Notes** | Verify URL contains `/dashboard` |

---

### Test Case ID: TC_EU_002
**Title:** Verify product search functionality

| Section        | Details |
|----------------|---------|
| **Precondition** | User is logged in and on the dashboard |
| **Test Data** | Search term: "ADIDAS" |
| **Steps** | 1. Locate the search input field in the left sidebar<br>2. Type "ADIDAS" into the search field<br>3. Observe the product cards update |
| **Expected Result** | The product listing filters to show only products matching "ADIDAS". At minimum, "ADIDAS ORIGINAL" should be displayed. |
| **Actual Result** | |
| **Status** | Pass / Fail |
| **Notes** | Search is real-time (no search button required). Verify the product count decreases when a specific term is used. |

---

### Test Case ID: TC_EU_003
**Title:** Verify adding a product to cart

| Section        | Details |
|----------------|---------|
| **Precondition** | User is logged in and products are displayed |
| **Test Data** | Product: ADIDAS ORIGINAL |
| **Steps** | 1. Identify the product card for "ADIDAS ORIGINAL"<br>2. Click the "Add To Cart" button on that card<br>3. Observe the toast/notification<br>4. Check the cart badge icon in the navigation bar |
| **Expected Result** | A success toast/message appears: "Product Added To Cart". The cart badge in the nav bar updates to show the count (e.g., "Cart 1"). |
| **Actual Result** | |
| **Status** | Pass / Fail |
| **Notes** | The cart count badge appears next to the Cart link in the top navigation bar. |

---

### Test Case ID: TC_EU_004
**Title:** Verify cart page displays the correct product and pricing

| Section        | Details |
|----------------|---------|
| **Precondition** | At least one product has been added to cart |
| **Test Data** | Product: ADIDAS ORIGINAL ($11500) |
| **Steps** | 1. Click on the "Cart" link in the navigation bar<br>2. Observe the cart page layout<br>3. Verify the product name, price, and quantity are displayed<br>4. Verify the subtotal and total amounts |
| **Expected Result** | Cart page shows the product with correct name ("ADIDAS ORIGINAL"), MRP ($11500), "IN STOCK" status. Subtotal and Total both show $11500. "Checkout" and "Continue Shopping" buttons are visible. |
| **Actual Result** | |
| **Status** | Pass / Fail |
| **Notes** | URL should contain `/cart`. Verify "Buy Now" button is also present per product. |

---

### Test Case ID: TC_EU_005
**Title:** Verify checkout navigation

| Section        | Details |
|----------------|---------|
| **Precondition** | User is on the cart page with at least one product |
| **Test Data** | N/A |
| **Steps** | 1. Click the "Checkout" button on the cart page<br>2. Observe the order/payment page<br>3. Verify the order summary section<br>4. Verify payment method options are displayed |
| **Expected Result** | User is navigated to the order page (URL contains `/order`). The page displays: product summary (name, price, quantity), payment method options (Credit Card, Paypal, SEPA, Invoice), personal information fields (Credit Card Number, Expiry Date, CVV, Name on Card), shipping information, and a "Place Order" link. |
| **Actual Result** | |
| **Status** | Pass / Fail |
| **Notes** | The "Place Order" is an `<a>` tag, not a button. No credit card details need to be filled for this practice app. |

---

### Test Case ID: TC_EU_006
**Title:** Verify logout functionality

| Section        | Details |
|----------------|---------|
| **Precondition** | User is logged in on any page (dashboard, cart, or order page) |
| **Test Data** | N/A |
| **Steps** | 1. Click the "Sign Out" button in the top navigation bar<br>2. Observe the page redirect |
| **Expected Result** | User is redirected to the login page. URL contains `/auth/login`. The email and password fields are displayed again. |
| **Actual Result** | |
| **Status** | Pass / Fail |
| **Notes** | After logout, verify that navigating to the dashboard URL redirects back to login (session is cleared). |

---

### Test Case ID: TC_EU_007
**Title:** Verify login with invalid credentials

| Section        | Details |
|----------------|---------|
| **Precondition** | User is on the login page |
| **Test Data** | Email: invalid@email.com, Password: wrongpassword |
| **Steps** | 1. Enter an invalid email address<br>2. Enter an incorrect password<br>3. Click "Login" button<br>4. Observe the error message |
| **Expected Result** | Login fails. An error toast/message appears: "Incorrect email or password." User remains on the login page. |
| **Actual Result** | |
| **Status** | Pass / Fail |
| **Notes** | This is a negative test case. The API returns a 400 status with the error message. |

---

### Test Case ID: TC_EU_008
**Title:** Verify empty cart state

| Section        | Details |
|----------------|---------|
| **Precondition** | User is logged in with no products in cart |
| **Test Data** | N/A |
| **Steps** | 1. Click the "Cart" link in the navigation bar<br>2. Observe the empty cart message |
| **Expected Result** | Cart page displays "No Products in Your Cart !" message. A "Continue Shopping" button is visible. No checkout button is present. |
| **Actual Result** | |
| **Status** | Pass / Fail |
| **Notes** | Clear cart by completing an order or ensure no products were added before this test. |

---

## Summary

| TC ID       | Scenario                          | Priority |
|-------------|-----------------------------------|----------|
| TC_EU_001   | Login with valid credentials      | Critical |
| TC_EU_002   | Search for product                | High     |
| TC_EU_003   | Add product to cart               | Critical |
| TC_EU_004   | Verify cart contents and pricing  | High     |
| TC_EU_005   | Navigate to checkout              | High     |
| TC_EU_006   | Logout functionality              | Medium   |
| TC_EU_007   | Login with invalid credentials    | High     |
| TC_EU_008   | Empty cart state                  | Medium   |

---

*Document Version: 1.0*
*Created for: QA Automation Assignment*
