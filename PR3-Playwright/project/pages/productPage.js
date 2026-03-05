import HeaderComponent from "../components/headerComponent";

class ProductPage {
    constructor(page) {
        this.page = page;
        this.addToFavoritesBtn = page.locator('[data-test="add-to-favorites"]');
        this.myAccountMenu = page.locator('[data-test="nav-menu"]');
        this.myFavorites = page.locator('[data-test="nav-my-favorites"]');
        this.header = new HeaderComponent(page);
    }

    async addToFavorites() {
        await this.addToFavoritesBtn.click();
    }
}  

export default ProductPage;
