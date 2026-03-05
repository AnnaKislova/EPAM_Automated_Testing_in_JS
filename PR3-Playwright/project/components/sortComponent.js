import { expect } from '@playwright/test';

class SortComponent {
    constructor(page) {
        this.page = page;
        this.sortOption = page.locator('[data-test="sort"]');
        this.sortContainer = page.locator('[data-test="sorting_completed"]');
        this.priceElements = page.locator('[data-test="sorting_completed"] [data-test^="product-"] [data-test="product-price"]');
        this.product = page.locator('[data-test="product-name"]');
    }

    async sortProduct() {
        await this.sortOption.selectOption('price,asc');
        await expect(this.sortContainer).toBeVisible();
        await this.priceElements.first().waitFor({ state: 'visible'});
        return await this.priceElements.allTextContents();
    }

    async sortResultsContain(sortResults) {
        const prices =[];
        
            for(const el of sortResults) {
                const price = parseFloat(el.replace("$", ""));
                prices.push(price);
            }
        
            const sorted = [...prices].sort((a, b) => a - b);
        
            expect(prices).toEqual(sorted);
    }
}

export default SortComponent;