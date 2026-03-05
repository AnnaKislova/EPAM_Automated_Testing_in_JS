class ProductPage {
    constructor(page) {
        this.page = page;
        this.addToFavoritesBtn = page.locator('[data-test="add-to-favorites"]');
        this.myAccountMenu = page.locator('[data-test="nav-menu"]');
        this.myFavorites = page.locator('[data-test="nav-my-favorites"]');
        
    }

    async addToFavorites() {
        await this.addToFavoritesBtn.click();
        await this.myAccountMenu.click();
        await this.myFavorites.click();

    }
}  

export default ProductPage;



