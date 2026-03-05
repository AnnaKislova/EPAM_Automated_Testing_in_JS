import { expect } from '@playwright/test';

class SearchComponent {
    constructor(page) {
        this.page = page;
        this.searchField = page.locator('[data-test="search-query"]');
        this.searchButton = page.locator('[data-test="search-submit"]');
        this.searchContainer = page.locator('[data-test="search_completed"]');
        this.productElements = page.locator('[data-test="search_completed"] [data-test^="product-"] [data-test="product-name"]');
    }

    async searchProduct(query) {
        await this.searchField.fill(query);
        await this.searchButton.click();
        await expect(this.searchContainer).toBeVisible();
        await this.searchContainer.waitFor({ state: 'attached' });
        return await this.productElements.allTextContents();
    }
    
    async searchResultsContain(searchResults, query) {
        for(const element of searchResults) {
            expect(element.toLowerCase()).toContain(query);
        }
    }
}

export default SearchComponent;
