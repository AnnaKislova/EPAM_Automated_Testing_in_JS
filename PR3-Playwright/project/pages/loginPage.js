import LoginComponent from '../components/loginComponent';

class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginForm = new LoginComponent(page);
    }

    async openLoginPage() {
        await this.page.goto('https://practicesoftwaretesting.com/auth/login');
    }
}

export default LoginPage;