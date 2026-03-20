import HeaderComponent from "../components/header.component";
import ProductListComponent from "../components/productList.component";

class FavoritesPage {
  get header() {
    return new HeaderComponent();
  }

  get favoritesTitle() {
    return $('[data-test="page-title"]');
  }

  get productList() {
    return new ProductListComponent();
  }

  async getFavoritesTitle() {
    return await this.favoritesTitle.getText();
  }
}

export default FavoritesPage;
