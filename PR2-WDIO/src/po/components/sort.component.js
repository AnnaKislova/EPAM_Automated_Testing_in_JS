class SortComponent {
    get sortDropdown() {
        return $('[data-test="sort"]');
    }

    get sortResult() {
        return $('[data-test="sorting_completed"]');
    }

    get elementsPrice() {
        return $$('[data-test="sorting_completed"] [data-test^="product-"] [data-test="product-price"]');
    }

    async sortOption(sortValue) {
        await this.sortDropdown.selectByAttribute('value', sortValue);
        await this.sortResult.waitForDisplayed({ timeout: 5000 }); 
    }

    async getPrices() {
        const priceElements = await this.elementsPrice;
        const prices = [];

        for(const el of priceElements) {
            const priceText = await el.getText();
            const price = parseFloat(priceText.replace("$", ""));
            prices.push(price);
        }
        return prices;
        
    }

}

export default SortComponent;
