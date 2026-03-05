class FavoritesPage {
    constructor(page) {
        this.page = page;
        this.favoritesTitle = page.locator('[data-test="page-title"]');
        this.productInFavorites = page.locator('[data-test="product-name"]');
    }

    async getFavoriteProduct() {
        const productFavorite = await this.productInFavorites.first().textContent();
        return productFavorite.trim();
    }
}

export default FavoritesPage;
