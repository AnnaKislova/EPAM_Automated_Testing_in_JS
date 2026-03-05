import { createUser } from "../../fixtures/userData";
import HomePage from "../../support/page_object/HomePage";
import ProductPage from "../../support/page_object/ProductPage";
import CartPage from "../../support/page_object/CartPage";
import CheckoutPage from "../../support/page_object/CheckoutPage";

describe('Authorized user actions', () => {
    beforeEach(() => {
        const user = createUser();

        cy.request({ 
            method: 'POST',
            url: 'https://api.practicesoftwaretesting.com/users/register',
            body: user
    }).then((response) => {
            expect(response.status).to.equal(201);
    });

    cy.request({
        method: 'POST',
        url: 'https://api.practicesoftwaretesting.com/users/login',
        body: {
            email: user.email,
            password: user.password
        }
    }).then((response) => {
        expect(response.status).to.equal(200);
        cy.wrap(response.body.access_token).as('token');
        cy.wrap(user).as('user');
    });
    });

    it('Authorized user adds a product to the cart', function() {
        
        cy.get('@token').then((token) => {
            cy.window().then((win) => {
                win.localStorage.setItem('auth-token', token);
            });
            const homePage = new HomePage();
            const productPage = new ProductPage();
            const cartPage = new CartPage();
            homePage.open();
            homePage.getProductTitle()
            .then((productName) => {
                homePage.clickFirstProduct();
                productPage.addToCart();
                homePage.clickCart();
                cartPage.cartProductTitle()
                .then((productTitle) => {
                    expect(productTitle.trim()).to.equal(productName.trim());
                });
            });
            
        });
    });

    it('Authorized user can pay for a product via Bank Transfer', function() {
    cy.get('@token').then((token) => {
        cy.get('@user').then((user) => {  
            cy.window().then((win) => {
                win.localStorage.setItem('auth-token', token);
            });
            const homePage = new HomePage();
            const productPage = new ProductPage();
            const cartPage = new CartPage();
            const checkoutPage = new CheckoutPage();

            homePage.open();
            homePage.clickFirstProduct();
            productPage.addToCart();
            homePage.clickCart();

            cartPage.proceedFirst();
            checkoutPage.clickProceed();

            cy.get('@user').then((user) => {
                checkoutPage.fillBankForm(user);
            })
            });
        });
    });

});



