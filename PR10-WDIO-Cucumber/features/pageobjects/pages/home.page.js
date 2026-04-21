import SearchComponent from "../components/search.component";
import SortComponent from "../components/sort.component";
import ProductListComponent from "../components/productList.component";

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
    await browser.url("/");
  }
}

export default HomePage;
