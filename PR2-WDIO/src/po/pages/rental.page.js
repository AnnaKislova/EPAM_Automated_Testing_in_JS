import ProductRentalComponent from "../components/productRental.component";

class RentalPage {

    get productElements() {
        return $$('[data-test^="product-"]');
    }

    async open() {
        await browser.url("https://practicesoftwaretesting.com/rentals");
    }

    async waitForProductsLoaded() {
        await browser.waitUntil(
            async () => (await this.productElements).length > 0,
            { timeout: 10000, timeoutMsg: "Rental products did not load" }
        );
    }

    get products() {
        return this.productElements.map(el => new ProductRentalComponent(el))
    }

    async openProduct(index) {
        await this.products[index].openRentalProduct();
    }
}

export default new RentalPage();

