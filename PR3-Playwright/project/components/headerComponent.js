class HeaderComponent {
    constructor(page) {
        this.page = page;
        this.myAccountMenu = page.locator('[data-test="nav-menu"]');
        this.myFavorites = page.locator('[data-test="nav-my-favorites"]');
        
    }

    async openFavorites() {
        await this.myAccountMenu.click();
        await this.myFavorites.click();
    }
}

export default HeaderComponent;
