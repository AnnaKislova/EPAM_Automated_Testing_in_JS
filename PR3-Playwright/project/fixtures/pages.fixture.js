import { test as base } from '@playwright/test';
import HomePage from '../pages/homePage.js';
import ProductPage from '../pages/productPage.js';
import FavoritesPage from '../pages/favoritesPage.js';

export const test = base.extend({
    homePage: async ({ page }, use) => {
        const home = new HomePage(page);
        await use(home);
    },
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },

    favoritesPage: async ({ page }, use) => {
        const favoritesPage = new FavoritesPage(page);
        await use(favoritesPage);
    }

});

export const expect = base.expect;