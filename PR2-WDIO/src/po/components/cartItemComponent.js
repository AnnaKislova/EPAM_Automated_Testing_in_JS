class cartItemComponent {
    get productTitle() {
        return $('[data-test="product-title"]');
    }

    async getProductName() {
       return await this.productTitle.getText();
    }
}

export default cartItemComponent;

