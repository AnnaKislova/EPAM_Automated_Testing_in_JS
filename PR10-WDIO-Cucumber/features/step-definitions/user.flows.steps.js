import { Given, When, Then } from "@wdio/cucumber-framework";
import HomePage from "../pageobjects/pages/home.page.js";
import RentalPage from "../pageobjects/pages/rental.page.js";
import RentalProductPage from "../pageobjects/pages/rentalProduct.page.js";
const homePage = new HomePage();
const rentalPage = new RentalPage();
const rentalProductPage = new RentalProductPage();

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
