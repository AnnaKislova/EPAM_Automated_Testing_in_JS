import { createUser } from '../data/userData.js';
import { apiRegister } from '../helpers/apiRegister.js';
import { apiLogin } from '../helpers/apiAuth.js';
import { test, expect } from '../fixtures/pages.fixture.js';

test.describe('Authorized user shopping actions', () => {

    let user;
    let token;

    test.beforeAll(async ({ request }) => {
        user = createUser();

        await apiRegister(request, user);

        token = await apiLogin(request,user);
    });

        test('The logged-in user adds a product to favorites', async ({ page, homePage, productPage, favoritesPage }) => {

        await page.addInitScript(token => {
            window.localStorage.setItem('auth-token', token);
        }, token);

            await homePage.openHomePage();

            const productName = await homePage.getProduct();

            await productPage.addToFavorites()
        
            await expect(favoritesPage.favoritesTitle).toContainText('Favorites');
        
            const productFavorite = await favoritesPage.getFavoriteProduct();
            
            expect(productFavorite).toEqual(productName);


    });

});







