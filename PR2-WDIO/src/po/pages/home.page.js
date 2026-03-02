
import SearchComponent from '../components/search.component.js';

import SortComponent from '../components/sort.component.js';


class HomePage {

    get search() {
        return new SearchComponent();
    }

    get sort() {
        return new SortComponent();
    }

    async open() {
        await browser.url('/');
    }

}

export default new HomePage();