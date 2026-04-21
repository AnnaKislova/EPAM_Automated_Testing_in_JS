import ProductListComponent from '../components/productListComponent';
import SearchComponent from '../components/searchComponent';
import SortComponent from '../components/sortComponent';

class HomePage {
  constructor(page) {
    this.page = page;
    this.search = new SearchComponent(page);
    this.sort = new SortComponent(page);
    this.productList = new ProductListComponent(page);
  }

  async openHomePage() {
    await this.page.goto('/');
  }
}

export default HomePage;
