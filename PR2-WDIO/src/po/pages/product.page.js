import HeaderComponent from '../components/header.component';

class ProductPage {
  get favoriteBt() {
    return $('[data-test="add-to-favorites"]');
  }

  get header() {
    return new HeaderComponent();
  }

  get addToCartBtn() {
    return $('[data-test="add-to-cart"]');
  }

  async addToFavorite() {
    await this.favoriteBt.click();
  }

  async addToCart() {
    await this.addToCartBtn.waitForExist({ timeout: 10000 });
    await this.addToCartBtn.click();
  }
}

export default ProductPage;
