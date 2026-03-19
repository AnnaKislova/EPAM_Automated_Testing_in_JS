import { Given, When, Then } from "@wdio/cucumber-framework";
import HomePage from "../pageobjects/pages/home.page.js";
const homePage = new HomePage();

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
