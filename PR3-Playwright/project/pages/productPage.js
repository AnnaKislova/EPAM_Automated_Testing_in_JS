import HeaderComponent from '../components/headerComponent';

class ProductPage {
  constructor(page) {
    this.page = page;
    this.header = new HeaderComponent(page);
  }

  get addToFavoritesBtn() {
    return this.page.locator('[data-test="add-to-favorites"]');
  }

  async addToFavorites() {
    await this.addToFavoritesBtn.click();
  }
}

export default ProductPage;
