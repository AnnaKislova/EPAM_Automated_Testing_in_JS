class HomePage {
    get languageSelect() {
        return cy.get('[data-test="language-select"]');
    }

    get languageChoice() {
        return cy.get('[data-test="lang-es"]');
    }

    get firstProduct() {
        return cy.get('[data-test="product-name"]');
    }

    get cartBtn() {
        return cy.get('[data-test="nav-cart"]');
    }

    open() {
        cy.visit('https://practicesoftwaretesting.com/');
    }

    changeLanguage() {
        this.languageSelect.click();
        this.languageChoice.click();
        this.languageSelect.should('contain.text', 'ES');
    }

    getProductTitle() {
         return this.firstProduct.first().invoke('text');
    }

    clickFirstProduct() {
        this.firstProduct.first().click();
    }

    clickCart() {
        this.cartBtn.click();
    }
}

export default HomePage;



