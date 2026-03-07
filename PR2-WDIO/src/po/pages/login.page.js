import LoginFormComponents from "../components/loginForm.components";

class LoginPage {
    get loginHeader() {
        return $('h3=Login');
    }

    get loginForm() {
        return new LoginFormComponents();
    }

    async waitForLoginHeader() {
        await this.loginHeader.waitForDisplayed({ timeout: 10000 });
        return this.loginHeader;
    }

    async openLoginPage() {
        await browser.url('https://practicesoftwaretesting.com/auth/login');
    }
}

export default new LoginPage();

