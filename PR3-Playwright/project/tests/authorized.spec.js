import { test, expect } from '../fixtures/pages.fixture.js';

test.describe('Authorized user shopping actions', () => {

    test('The logged-in user adds a product to favorites', async ({ page, homePage, productPage, favoritesPage, authToken }) => {

        await page.addInitScript(token => {
            window.localStorage.setItem('auth-token', token);
        }, authToken);

            await homePage.openHomePage();

            const productName = await homePage.productList.getFirstProductName();
            await homePage.productList.openFirstProduct();

            await productPage.addToFavorites();

            await productPage.header.openFavorites();
            await expect(favoritesPage.favoritesTitle).toContainText('Favorites');
        
            const productFavorite = await favoritesPage.getFavoriteProduct();
            expect(productFavorite).toEqual(productName);
    });

});
