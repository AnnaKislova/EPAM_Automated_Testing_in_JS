import SearchComponent from '../components/searchComponent';
import SortComponent from '../components/sortComponent';

class HomePage {
    constructor(page) {
        this.page =page;
        this.search = new SearchComponent(page);
        this.sort = new SortComponent(page);
    }
                
    async openHomePage() {
        await this.page.goto("/");
    }

    async getProduct() {
        const firstProduct = this.product.first();
        const productName = (await firstProduct.textContent()).trim();
        await firstProduct.click();
        return productName;
    }
}
    
export default HomePage;

  