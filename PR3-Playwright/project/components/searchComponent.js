import { expect } from '@playwright/test';

class SearchComponent {
    constructor(page) {
        this.page = page;
    }
        
    get searchField() {
        return this.page.locator('[data-test="search-query"]');
    }

    get searchButton() {
        return this.page.locator('[data-test="search-submit"]');
    }

    get searchContainer() {
        return this.page.locator('[data-test="search_completed"]');
    }

    get productElements() {
        return this.page.locator('[data-test="search_completed"] [data-test^="product-"] [data-test="product-name"]');
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
