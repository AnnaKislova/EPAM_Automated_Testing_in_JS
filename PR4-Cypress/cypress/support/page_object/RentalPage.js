class RentalPage{
    getFirstProduct() {
        return cy.get('[data-test^="product-"]').first().click();
    }
    open() {
        cy.visit("https://practicesoftwaretesting.com/rentals");
    }
}

export default RentalPage;