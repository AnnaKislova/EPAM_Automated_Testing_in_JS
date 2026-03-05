import { expect } from '@playwright/test';

class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailField = page.locator('[data-test="email"]');
        this.passwordField = page.locator('[data-test="password"]');
        this.loginBtn = page.locator('[data-test="login-submit"]');
        this.pageTitle = page.locator('[data-test="page-title"]');
    }
    async openLoginPage() {
        await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    }
    async loginForm(user) {
        await this.emailField.fill(user.email);
        await this.passwordField.fill(user.password);

        await this.loginBtn.click();
        await this.page.waitForURL('**/account');
        await expect(this.pageTitle).toBeVisible();


        
    }
}

export default LoginPage;