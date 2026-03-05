import { test as base } from '@playwright/test';
import HomePage from '../pages/homePage.js';
import ProductPage from '../pages/productPage.js';
import FavoritesPage from '../pages/favoritesPage.js';
import RegisterPage from '../pages/registerPage.js';
import LoginPage from '../pages/loginPage.js';
import ProfilePage from '../pages/profilePage.js';


export const test = base.extend({
    homePage: async ({ page }, use) => {
        const home = new HomePage(page);
        await use(home);
    },

    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    profilePage: async ({ page }, use) => {
        const profilePage = new ProfilePage(page);
        await use(profilePage);
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