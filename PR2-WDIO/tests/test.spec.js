import { createUser } from '../src/data/user.js';
import { prepareUser } from '../src/helpers/prepareUser.js';
import { assert } from 'chai';

describe("Product Discovery", () => {

    it("Search returns products related to 'hammer'", async () => {
        
        await browser.url('/');

        const input = await $('[data-test="search-query"]');
        await input.setValue('hammer');

        const searchButton = await $('[data-test="search-submit"]');
        await searchButton.click();

        const resultsContainer = await $('[data-test="search_completed"]');
        await resultsContainer.waitForDisplayed({ timeout: 5000 });

        const productElements = await $$('[data-test="search_completed"] [data-test^="product-"] [data-test="product-name"]');

        const titlesText = [];
        for (const el of productElements) {
            titlesText.push(await el.getText());
        }

        for (const text of titlesText) {
            expect(text.toLowerCase()).toHaveText('hammer');
        }
    });

    it("Products are sorted by price in ascending order ", async () => {
        await browser.url('/');

        await $('[data-test="sort"]').selectByAttribute('value', 'price,asc');  
    
        const resultsSort = await $('[data-test="sorting_completed"]');
        await resultsSort.waitForDisplayed({ timeout: 5000 });

        const priceElements = await $$('[data-test="sorting_completed"] [data-test^="product-"] [data-test="product-price"]');
        const prices = [];

        for(const el of priceElements) {
            const priceText = await el.getText();
            const price = parseFloat(priceText.replace("$", ""));
            prices.push(price);

        }

    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
        
    });

    it("Total price updates correctly for rental products", async () => {
        
        await browser.url("https://practicesoftwaretesting.com/rentals");

        await browser.waitUntil(
            async () => (await $$('[data-test^="product-"]')).length > 0,
            { timeout: 10000, timeoutMsg: "Rental products did not load" }
        );

        const rentalProducts = await $$('[data-test^="product-"]');

        await rentalProducts[0].click();

        const slider = await $('.ngx-slider-pointer-min');
        const unitPriceEl = await $('[data-test="unit-price"]');
        const totalPriceEl = await $('#total-price');

        const unitPrice = parseFloat(await unitPriceEl.getText());

        await slider.dragAndDrop({ x: 94, y: 0 });

        const totalPrice = parseFloat(await totalPriceEl.getText());

        expect(totalPrice).toBeCloseTo(unitPrice * 3, 2);

        const sliderValue = await slider.getAttribute('aria-valuetext');
        expect(sliderValue).toBe('3');
    });

});

describe("Registration and login", () => {
    let user;

    before(() => {
        user = createUser();
    })

        it('The user can successfully register with valid personal data', async () => {

        await browser.url("https://practicesoftwaretesting.com/auth/register")
        await $('[data-test="first-name"]').setValue(user.firstName);
        await $('[data-test="last-name"]').setValue(user.lastName);
        await $('[data-test="dob"]').setValue(user.dateOfBirthday);
        await $('[data-test="street"]').setValue(user.street);
        await $('[data-test="postal_code"]').setValue(user.postalCode);
        await $('[data-test="city"]').setValue(user.city);
        await $('[data-test="state"]').setValue(user.state);
        const countrySelect = await $('[data-test="country"]');
        await countrySelect.selectByAttribute('value', user.country);
        await $('[data-test="phone"]').setValue(user.phone);
        await $('[data-test="email"]').setValue(user.email);
        await $('[data-test="password"]').setValue(user.password);
        await $('[data-test="register-submit"]').click();

        const loginHeader = await $('h3=Login');
        await loginHeader.waitForDisplayed({ timeout: 10000 });

        await expect(loginHeader).toBeDisplayed();

    });

    it('The user logs in with valid credentials', async () => {
        
        await browser.url('https://practicesoftwaretesting.com/auth/login');
        await $('[data-test="email"]').setValue(user.email);
        await $('[data-test="password"]').setValue(user.password);
        await $('[data-test="login-submit"]').click();

        const title = await $('[data-test="page-title"]');
        const titleText = await title.getText();
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


