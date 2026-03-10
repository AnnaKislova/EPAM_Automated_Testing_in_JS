import SearchComponent from '../components/search.component.js';
import SortComponent from '../components/sort.component.js';
import ProductListComponent from '../components/productList.component.js';

class HomePage {
  get search() {
    return new SearchComponent();
  }

  get sort() {
    return new SortComponent();
  }

  get productList() {
    return new ProductListComponent();
  }

  async open() {
    await browser.url('/');
  }
}

export default HomePage;
