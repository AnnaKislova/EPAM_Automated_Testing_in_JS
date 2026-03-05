class LoginComponent {
    constructor(page) {
        this.page = page;
        this.loginHeader = page.getByRole('heading', { name: 'Login' });
        this.emailField = page.locator('[data-test="email"]');
        this.passwordField = page.locator('[data-test="password"]');
        this.loginBtn = page.locator('[data-test="login-submit"]');
        this.pageTitle = page.locator('[data-test="page-title"]');
    }

    async fillLoginForm(user) {
        await this.emailField.fill(user.email);
        await this.passwordField.fill(user.password);
        await this.loginBtn.click();
    }
}

export default LoginComponent;