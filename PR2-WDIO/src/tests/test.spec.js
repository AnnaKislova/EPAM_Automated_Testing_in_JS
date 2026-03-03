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
        await browser.url('/');
        const product = await $('[data-test="product-name"]');
        const productName = await $('[data-test="product-name"]').getText();
        await product.click();
        
        const favoriteBt = await $('[data-test="add-to-favorites"]');
        await favoriteBt.click();
        const accountBt = await $('[data-test="nav-menu"]');
        await accountBt.click();
        await $('[data-test="nav-my-favorites"]').click();

        const pageTitle =  await $('[data-test="page-title"]');
        const titleText = await pageTitle.getText();
        assert.equal(titleText, "Favorites", "Expected to be on My account page");
        const productFavorite = await $('[data-test="product-name"]').getText();
        assert.equal(productFavorite, productName, "Product favorite should match the one added")

    })

    it("The logged-in user adds a product to the cart", async () => {
        await browser.url('/');
        const product = await $('[data-test="product-name"]');
        const productName = await $('[data-test="product-name"]').getText();
        await product.click();

        const addToCartBtn = await $('[data-test="add-to-cart"]');
        await addToCartBtn.waitForExist({ timeout: 10000 });
        await addToCartBtn.click();

        const cartBtn = await $('[data-test="nav-cart"]')
        await cartBtn.click();

        const productTitle = await $('[data-test="product-title"]');
        const productText = await productTitle.getText();

        assert.equal(productText.trim(), productName.trim(), `Expected product in a cart to be ${productName}`);
    })
});

describe("Change password", () => {
    let newUser;

    before(async () => {
        newUser = await prepareUser();
    });

    it("The logged-in user updates the password", async () => {

        await browser.url("https://practicesoftwaretesting.com/account/profile");

        const currentPassword = await $('[data-test="current-password"]');
        await currentPassword.setValue(newUser.password);

        await browser.keys("Tab");

        await browser.waitUntil(
            async () => !(await currentPassword.getAttribute("class")).includes("ng-pending"),
            { timeout: 7000, timeoutMsg: "Async validation did not finish" }
        );
        
        await browser.waitUntil(
            async () => (await currentPassword.getAttribute("class")).includes("ng-valid"),
            { timeout: 5000, timeoutMsg: "Current password did not become valid" }
        );

        const newPassword = await $('[data-test="new-password"]');
        await newPassword.setValue(newUser.newPassword);
        await browser.keys("Tab");

        const confirmPassword = await $('[data-test="new-password-confirm"]');
        await confirmPassword.setValue(newUser.newPassword);
        await browser.keys("Tab");

        const form = await $("form");
        await browser.waitUntil(
            async () => (await form.getAttribute("class")).includes("ng-valid"),
            { timeout: 5000, timeoutMsg: "Form did not become valid" }
        );
               
        const submitBtn = await $('[data-test="change-password-submit"]');
        await submitBtn.scrollIntoView();
        await submitBtn.click(); 

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes("/login"),
            { timeout: 10000, timeoutMsg: "Expected redirect to /login after password change" }
        );

        await expect($("h3=Login")).toBeDisplayed();
    });
});


