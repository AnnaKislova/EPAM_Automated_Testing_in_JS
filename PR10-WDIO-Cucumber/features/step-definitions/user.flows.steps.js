import { Given, When, Then } from "@wdio/cucumber-framework";
import { user } from "../../data/user.js";
import { assert } from "chai";
import HomePage from "../pageobjects/pages/home.page.js";
import RentalPage from "../pageobjects/pages/rental.page.js";
import RentalProductPage from "../pageobjects/pages/rentalProduct.page.js";
import RegistrationPage from "../pageobjects/pages/registration.page.js";
import LoginPage from "../pageobjects/pages/login.page.js";
import AccountPage from "../pageobjects/pages/account.page.js";
import ProductPage from "../pageobjects/pages/product.page.js";
import FavoritesPage from "../pageobjects/pages/favorites.page.js";
import CartPage from "../pageobjects/pages/cart.page.js";
import ProfilePage from "../pageobjects/pages/profile.page.js";
const homePage = new HomePage();
const rentalPage = new RentalPage();
const rentalProductPage = new RentalProductPage();
const registrationPage = new RegistrationPage();
const loginPage = new LoginPage();
const accountPage = new AccountPage();
const productPage = new ProductPage();
const favoritesPage = new FavoritesPage();
const cartPage = new CartPage();
const profilePage = new ProfilePage();

Given(/^the user is on the home page$/, async () => {
  await homePage.open();
});

When(
  /^the user enters "([^"]*)" into the search field$/,
  async (productName) => {
    await homePage.search.searchFor(productName);
  },
);

When(/^the user clicks the Search button$/, async () => {
  await homePage.search.submit();
});

Then(
  /^the user sees products related to "([^"]*)" in the search results$/,
  async (productName) => {
    const titles = await homePage.search.getResultTitles();

    for (const title of titles) {
      expect(title.toLowerCase()).toContain(productName.toLowerCase());
    }
  },
);

When(/^the user selects sorting by price in ascending order$/, async () => {
  await homePage.sort.sortOption("price,asc");
});

Then(
  /^the user sees the products listed in ascending order by price$/,
  async () => {
    const prices = await homePage.sort.getPrices();

    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  },
);

Given(
  /^the logged-out user is on the rental product details page$/,
  async () => {
    await rentalPage.open();
  },
);

When(/^the user selects a valid rental duration$/, async () => {
  await rentalPage.waitForProductsLoaded();
  await rentalPage.openProduct(0);
  await rentalProductPage.options.setDuration();
});

Then(/^the total price updates correctly$/, async () => {
  const unitPrice = await rentalProductPage.options.getUnitPrice();
  const totalPrice = await rentalProductPage.options.getTotalPrice();
  const sliderValue = await rentalProductPage.options.getSliderValue();

  expect(sliderValue).toBe("3");
  expect(totalPrice).toBeCloseTo(unitPrice * 3, 2);
});

Given(/^the user is on the register page$/, async () => {
  await registrationPage.openRegistrationPage();
});

When(/^the user enters valid personal data$/, async () => {
  await registrationPage.registrationForm.fillRegisterForm(user);
});

Then(/^the user is registered$/, async () => {
  await loginPage.waitForLoginHeader();
});

Then(/^redirected to the login form$/, async () => {
  const loginHeader = await loginPage.waitForLoginHeader();
  await expect(loginHeader).toBeDisplayed();
});

Given(/^the user is on the login page$/, async () => {
  await loginPage.openLoginPage();
});

When(/^the user enters a valid email and a valid password$/, async () => {
  await loginPage.loginForm.fillLoginForm(user);
});

When(/^the user clicks the login button$/, async () => {
  await loginPage.loginForm.submit();
});

Then(/^the user redirected to the user page$/, async () => {
  const titleText = await accountPage.getTitleText();
  expect(titleText).toContain("My account");
});

let productName;

Given(/^the logged-in user is on the home page$/, async () => {
  await homePage.open();
});

When(/^the user clicks "Add to favorites"$/, async () => {
  productName = await homePage.productList.getFirstProductName();
  await homePage.productList.openFirstProduct();
  await productPage.addToFavorite();
});

Then(
  /^the user sees the success message "Product added to your favorites list"$/,
  async () => {
    await productPage.header.openFavorites();
    const titleText = await favoritesPage.getFavoritesTitle();
    assert.equal(titleText, "Favorites", "Expected to be on My account page");

    const productFavorite =
      await favoritesPage.productList.getFirstProductName();
    assert.equal(
      productFavorite,
      productName,
      "Product favorite should match the one added",
    );
  },
);

When(/^the user clicks "Add to cart" button$/, async () => {
  productName = await homePage.productList.getFirstProductName();
  await homePage.productList.openFirstProduct();

  await productPage.addToCart();
});

Then(
  /^the user sees the success message "Product added to shopping cart"$/,
  async () => {
    await productPage.header.openCart();

    const productText = await cartPage.cartItems.getProductName();

    assert.equal(
      productText.trim(),
      productName.trim(),
      `Expected product in a cart to be ${productName}`,
    );
  },
);

Given(/^the user is on the profile page$/, async () => {
  await profilePage.openProfilePage();
});

When(/^the user enters the current password$/, async () => {
  await profilePage.fillCurrentPassword(user.password);
  await profilePage.waitForCurrentPasswordValid();
});

When(/^the user enters a new valid password$/, async () => {
  await profilePage.fillNewPassword(user.newPassword);
});

When(/^the user confirms the new valid password$/, async () => {
  await profilePage.fillConfirmPassword(user.newPassword);
  await profilePage.waitForFormValid();
});

When(/^the user clicks Change Password button$/, async () => {
  await profilePage.clickSubmit();
});

Then(/^the password is successfully updated$/, async () => {
  await profilePage.waitForRedirectToLogin();
});

Then(/^the user is logged out automatically$/, async () => {
  await expect(loginPage.loginHeader).toBeDisplayed();
});
