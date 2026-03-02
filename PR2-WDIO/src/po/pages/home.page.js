import SearchComponent from '../components/search.component.js';

class HomePage {
    get search() {
        return SearchComponent;
    }

    async open() {
        await browser.url('/');
    }
}

export default new HomePage();