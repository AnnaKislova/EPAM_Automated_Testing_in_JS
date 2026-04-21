class ProductListComponent {
  get productList() {
    return $$('[data-test="product-name"]');
  }

  async openFirstProduct() {
    const firstProduct = await this.productList[0];
    await firstProduct.click();
  }

  async getFirstProductName() {
    const firstProduct = await this.productList[0];
    return await firstProduct.getText();
  }
}

export default ProductListComponent;
