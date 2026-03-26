class LoginComponent {
  constructor(page) {
    this.page = page;
  }

  get loginHeader() {
    return this.page.getByRole('heading', { name: 'Login' });
  }

  get emailField() {
    return this.page.locator('[data-test="email"]');
  }

  get passwordField() {
    return this.page.locator('[data-test="password"]');
  }

  get loginBtn() {
    return this.page.locator('[data-test="login-submit"]');
  }

  get pageTitle() {
    return this.page.locator('[data-test="page-title"]');
  }

  async fillLoginForm(user) {
    await this.emailField.fill(user.email);
    await this.passwordField.fill(user.password);
    await this.loginBtn.click();
  }
}

export default LoginComponent;
