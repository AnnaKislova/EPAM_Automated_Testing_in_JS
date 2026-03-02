class ProductRentalComponent {
    constructor(root) {
        this.root = root;
    }

    async openRentalProduct() {
        await this.root.click();
    }
}

export default ProductRentalComponent;

