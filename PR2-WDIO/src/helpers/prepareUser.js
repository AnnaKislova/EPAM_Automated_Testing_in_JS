import { user } from '../data/user.js';
import LoginPage from '../po/pages/login.page.js';
import AccountPage from '../po/pages/account.page.js';

export async function prepareUser() {
    
    await LoginPage.openLoginPage();
    await LoginPage.loginForm.fillLoginForm(user);
    
    const titleText = await AccountPage.getTitleText();
    expect(titleText).toContain('My account');

    return user;
}
