class FavoritesPage {
    constructor(page) {
        this.page = page;
    }

    get favoritesTitle() {
        return this.page.locator('[data-test="page-title"]');
    }

    get productInFavorites() {
        return this.page.locator('[data-test="product-name"]');
    }

    async getFavoriteProduct() {
        const productFavorite = await this.productInFavorites.first().textContent();
        return productFavorite.trim();
    }
}

export default FavoritesPage;
