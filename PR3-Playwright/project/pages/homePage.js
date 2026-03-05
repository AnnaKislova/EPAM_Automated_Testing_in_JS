import { expect } from '@playwright/test';

class HomePage {

        constructor(page) {

            this.page =page;
            this.searchField = page.locator('[data-test="search-query"]');
            this.searchButton = page.locator('[data-test="search-submit"]');
            this.searchContainer = page.locator('[data-test="search_completed"]');
            this.productElements = page.locator('[data-test="search_completed"] [data-test^="product-"] [data-test="product-name"]');
            this.sortOption = page.locator('[data-test="sort"]');
            this.sortContainer = page.locator('[data-test="sorting_completed"]');
            this.priceElements = page.locator('[data-test="sorting_completed"] [data-test^="product-"] [data-test="product-price"]');
            this.product = page.locator('[data-test="product-name"]');
        }
                
            async openHomePage() {
                await this.page.goto("/");
            }
        
            async search(query) {
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

            async sort() {
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

            async getProduct() {
                const firstProduct = this.product.first();
                const productName = (await firstProduct.textContent()).trim();
                await firstProduct.click();
                return productName;
            }

                

        }
    

export default HomePage;

  