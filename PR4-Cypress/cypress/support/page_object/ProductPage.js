class ProductPage {
    get addToCartBtn() {
        return cy.get('[data-test="add-to-cart"]');
    }

    addToCart() {
        this.addToCartBtn.click();
        cy.get('[data-test="cart-quantity"]').should('not.be.empty');
    }
}

export default ProductPage;