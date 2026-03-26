class HeaderComponent {
  constructor(page) {
    this.page = page;
  }

  get myAccountMenu() {
    return this.page.locator('[data-test="nav-menu"]');
  }

  get myFavorites() {
    return this.page.locator('[data-test="nav-my-favorites"]');
  }

  async openFavorites() {
    await this.myAccountMenu.click();
    await this.myFavorites.click();
  }
}

export default HeaderComponent;
