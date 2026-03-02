class SearchComponent {
    get input() {
        return $('[data-test="search-query"]');
    }

    get submitButton() {
        return $('[data-test="search-submit"]');
    }

    get resultsContainer() {
        return $('[data-test="search_completed"]');
    }

    get productTitles() {
        return $$('[data-test="search_completed"] [data-test^="product-"] [data-test="product-name"]');
    }

    async searchFor(query) {
        await this.input.setValue(query);
        await this.submitButton.click();
        await this.resultsContainer.waitForDisplayed({ timeout: 5000 });
    }

    async getResultTitles() {
        const elements = await this.productTitles;
        const titles = [];

        for (const el of elements) {
            titles.push(await el.getText());
        }

        return titles;
    }
}

export default new SearchComponent();