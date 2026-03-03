class HeaderComponent {
    get accountMenuBt() {
        return $('[data-test="nav-menu"]');
    }

    get favoritesBtn() {
        return $('[data-test="nav-my-favorites"]');
    }

    get cartBtn() {
        return $('[data-test="nav-cart"]');
    }

    async openFavorites() {
        await this.accountMenuBt.click();
        await this.favoritesBtn.click();
    }

    async openCart() {
        await this.accountMenuBt.click();
        await this.cartBtn.click();
    }

}

export default HeaderComponent;

