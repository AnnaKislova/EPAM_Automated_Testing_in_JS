
import SearchComponent from '../components/search.component.js';

import SortComponent from '../components/sort.component.js';


class HomePage {

    get search() {
        return SearchComponent;
    }

    get sort() {
        return SortComponent;
    }

    async open() {
        await browser.url('/');
    }

}

export default new HomePage();