class ProductListComponent {
    constructor(page) {
        this.page = page;
        this.productNames = page.locator('[data-test="product-name"]');
    }

    async getFirstProductName() {
        return (await this.productNames.first().textContent()).trim();
    }

    async openFirstProduct() {
        await this.productNames.first().click();
    }

}

export default ProductListComponent;
