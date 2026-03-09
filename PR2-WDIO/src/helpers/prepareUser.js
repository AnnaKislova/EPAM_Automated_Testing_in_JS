import { user } from '../data/user.js';
import LoginPage from '../po/pages/login.page.js';
import AccountPage from '../po/pages/account.page.js';

export async function prepareUser() {
    const loginPage = new LoginPage();
    const accountPage = new AccountPage();

    await loginPage.openLoginPage();
    await loginPage.loginForm.fillLoginForm(user);
    
    const titleText = await accountPage.getTitleText();
    expect(titleText).toContain('My account');

    return user;
}
