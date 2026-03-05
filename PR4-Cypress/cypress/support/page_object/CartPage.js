class CartPage {
    get productTitle() {
        return cy.get('[data-test="product-title"]');
    }

    get proceedBtnFirst() {
        return cy.get('[data-test="proceed-1"]');
    }

    cartProductTitle() {
        return this.productTitle.invoke('text');
    }

    proceedFirst() {
        this.proceedBtnFirst.click();
    }
}

export default CartPage;

