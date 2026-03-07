import { user } from '../data/user.js';
import { product } from '../data/productData.js';
import { prepareUser } from '../helpers/prepareUser.js';
import { assert } from 'chai';
import HomePage from '../po/pages/home.page.js';
import RentalPage from '../po/pages/rental.page.js';
import RentalProductPage from '../po/pages/rentalProduct.page.js';
import RegistrationPage from '../po/pages/registration.page.js';
import LoginPage from '../po/pages/login.page.js';
import AccountPage from '../po/pages/account.page.js';
import ProductPage from '../po/pages/product.page.js';
import FavoritesPage from '../po/pages/favorites.page.js';
import CartPage from '../po/pages/cart.page.js';
import ProfilePage from '../po/pages/profilePage.js';

describe("Product Discovery", () => {

    it("Search returns products related to 'hammer'", async () => {
        
        await HomePage.open();

        await HomePage.search.searchFor(product.hammer);

        const titles = await HomePage.search.getResultTitles();

        for (const title of titles) {
            expect(title.toLowerCase()).toHaveText(product.hammer);
        }

    });

    it("Products are sorted by price in ascending order ", async () => {
        
        await HomePage.open();

        await HomePage.sort.sortOption('price,asc');

        const prices = await HomePage.sort.getPrices();

        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
        
    });

    it("Total price updates correctly for rental products", async () => {
        
        await RentalPage.open();

        await RentalPage.waitForProductsLoaded();

        await RentalPage.openProduct(0);

        const unitPrice = await RentalProductPage.options.getUnitPrice();

        await RentalProductPage.options.setDuration();

        const totalPrice = await RentalProductPage.options.getTotalPrice();

        expect(totalPrice).toBeCloseTo(unitPrice * 3, 2);

        const sliderValue = await RentalProductPage.options.getSliderValue();
        expect(sliderValue).toBe('3');

    });

});

describe("Registration and login", () => {
    
    it('The user can successfully register with valid personal data', async () => {

        await RegistrationPage.openRegistrationPage();

        await RegistrationPage.registrationForm.fillRegisterForm(user);

        const loginHeader = await LoginPage.waitForLoginHeader();

        await expect(loginHeader).toBeDisplayed();

    });

    it('The user logs in with valid credentials', async () => {
        
        await LoginPage.openLoginPage();
        await LoginPage.loginForm.fillLoginForm(user);

        const titleText = await AccountPage.getTitleText();
        expect(titleText).toContain('My account');

    });

});

describe('Shopping actions', () => {
    let user;

    before(async () => {
        user = await prepareUser();
        
    });

    it('The logged-in user adds a product to favorites', async () => {
        await HomePage.open();
        const productName = await HomePage.productList.getFirstProductName();
        await HomePage.productList.openFirstProduct();

        await ProductPage.addToFavorite();
        await ProductPage.header.openFavorites();

        const titleText = await FavoritesPage.getFavoritesTitle();
        assert.equal(titleText, "Favorites", "Expected to be on My account page");

        const productFavorite = await FavoritesPage.productList.getFirstProductName();
        assert.equal(productFavorite, productName, "Product favorite should match the one added")

    });

    it("The logged-in user adds a product to the cart", async () => {
        
        await HomePage.open();
        const productName = await HomePage.productList.getFirstProductName();
        await HomePage.productList.openFirstProduct();

        await ProductPage.addToCart();
        await ProductPage.header.openCart();
        
        const productText = await CartPage.cartItems.getProductName();

        assert.equal(productText.trim(), productName.trim(), `Expected product in a cart to be ${productName}`);
    })
});

describe("Change password", () => {
    let newUser;

    before(async () => {
        newUser = await prepareUser();
    });

    it("The logged-in user updates the password", async () => {

        await ProfilePage.openProfilePage();

        await ProfilePage.fillCurrentPassword(newUser.password);
        await ProfilePage.waitForCurrentPasswordValid();

        await ProfilePage.fillNewPassword(newUser.newPassword);

        await ProfilePage.fillConfirmPassword(newUser.newPassword);
        await ProfilePage.waitForFormValid();
        await ProfilePage.clickSubmit();

        await ProfilePage.waitForRedirectToLogin();
            
        await expect(LoginPage.loginHeader).toBeDisplayed();
    });
});


