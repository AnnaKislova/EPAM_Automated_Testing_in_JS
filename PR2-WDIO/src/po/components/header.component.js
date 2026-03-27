class HeaderComponent {
  get accountMenuBtn() {
    return $('[data-test="nav-menu"]');
  }

  get favoritesBtn() {
    return $('[data-test="nav-my-favorites"]');
  }

  get cartBtn() {
    return $('[data-test="nav-cart"]');
  }

  async openFavorites() {
    await this.accountMenuBtn.click();
    await this.favoritesBtn.click();
  }

  async openCart() {
    await this.accountMenuBtn.click();
    await this.cartBtn.click();
  }
}

export default HeaderComponent;
