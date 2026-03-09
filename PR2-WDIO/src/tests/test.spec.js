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
    let homePage;
    let rentalPage;
    let rentalProductPage;

    beforeEach(() => {
        homePage = new HomePage();
        rentalPage = new RentalPage();
        rentalProductPage = new RentalProductPage();
    });

    it("Search returns products related to 'hammer'", async () => {
        
        await homePage.open();

        await homePage.search.searchFor(product.hammer);

        const titles = await homePage.search.getResultTitles();

        for (const title of titles) {
            expect(title.toLowerCase()).toHaveText(product.hammer);
        }

    });

    it("Products are sorted by price in ascending order ", async () => {
        
        await homePage.open();

        await homePage.sort.sortOption('price,asc');

        const prices = await homePage.sort.getPrices();

        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
        
    });

    it("Total price updates correctly for rental products", async () => {
        
        await rentalPage.open();

        await rentalPage.waitForProductsLoaded();

        await rentalPage.openProduct(0);

        const unitPrice = await rentalProductPage.options.getUnitPrice();

        await rentalProductPage.options.setDuration();

        const totalPrice = await rentalProductPage.options.getTotalPrice();

        expect(totalPrice).toBeCloseTo(unitPrice * 3, 2);

        const sliderValue = await rentalProductPage.options.getSliderValue();
        expect(sliderValue).toBe('3');

    });

});

describe("Registration and login", () => {
    let registrationPage;
    let loginPage;
    let accountPage;

    beforeEach(() => {
        registrationPage = new RegistrationPage();
        loginPage = new LoginPage();
        accountPage = new AccountPage();
    });
    
    it('The user can successfully register with valid personal data', async () => {

        await registrationPage.openRegistrationPage();

        await registrationPage.registrationForm.fillRegisterForm(user);

        const loginHeader = await loginPage.waitForLoginHeader();

        await expect(loginHeader).toBeDisplayed();

    });

    it('The user logs in with valid credentials', async () => {
        
        await loginPage.openLoginPage();
        await loginPage.loginForm.fillLoginForm(user);

        const titleText = await accountPage.getTitleText();
        expect(titleText).toContain('My account');

    });

});

describe('Shopping actions', () => {
    let user;
    let homePage;
    let productPage;
    let favoritesPage;
    let cartPage;

    before(async () => {
        user = await prepareUser();
        
    });

    beforeEach(() => {
        homePage = new HomePage();
        productPage = new ProductPage();
        favoritesPage = new FavoritesPage();
        cartPage = new CartPage();
    });

    it('The logged-in user adds a product to favorites', async () => {
        await homePage.open();
        const productName = await homePage.productList.getFirstProductName();
        await homePage.productList.openFirstProduct();

        await productPage.addToFavorite();
        await productPage.header.openFavorites();

        const titleText = await favoritesPage.getFavoritesTitle();
        assert.equal(titleText, "Favorites", "Expected to be on My account page");

        const productFavorite = await favoritesPage.productList.getFirstProductName();
        assert.equal(productFavorite, productName, "Product favorite should match the one added")

    });

    it("The logged-in user adds a product to the cart", async () => {
        
        await homePage.open();
        const productName = await homePage.productList.getFirstProductName();
        await homePage.productList.openFirstProduct();

        await productPage.addToCart();
        await productPage.header.openCart();
        
        const productText = await cartPage.cartItems.getProductName();

        assert.equal(productText.trim(), productName.trim(), `Expected product in a cart to be ${productName}`);
    })
});

describe("Change password", () => {
    let newUser;
    let profilePage;
    let loginPage;

    before(async () => {
        newUser = await prepareUser();
    });

    beforeEach(() => {
        profilePage = new ProfilePage();
        loginPage = new LoginPage();
    })

    it("The logged-in user updates the password", async () => {

        await profilePage.openProfilePage();

        await profilePage.fillCurrentPassword(newUser.password);
        await profilePage.waitForCurrentPasswordValid();

        await profilePage.fillNewPassword(newUser.newPassword);

        await profilePage.fillConfirmPassword(newUser.newPassword);
        await profilePage.waitForFormValid();
        await profilePage.clickSubmit();

        await profilePage.waitForRedirectToLogin();
            
        await expect(loginPage.loginHeader).toBeDisplayed();
    });
});
