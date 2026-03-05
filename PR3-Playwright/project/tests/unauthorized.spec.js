import { test } from '../fixtures/pages.fixture.js';
import { searchData } from '../data/searchData.js';

test.describe.configure({ mode: 'parallel' });

test.describe('Product Discovery', () => {
    
    test.beforeEach(async ({ homePage }) => {
        await homePage.openHomePage();
    });

    test('Search returns products related to "hammer"', async ({ homePage }) => {
        
        const searchResults = await homePage.search(searchData.hammer);

        await homePage.searchResultsContain(searchResults, searchData.hammer);

    });

    test('Products are sorted by price in ascending order', async ({ homePage }) => {

        const sortResults = await homePage.sort();

        await homePage.sortResultsContain(sortResults);
    })
});






