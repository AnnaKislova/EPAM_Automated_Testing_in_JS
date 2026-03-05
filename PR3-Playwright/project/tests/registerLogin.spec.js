import { createUser } from '../data/userData.js';
import { test, expect } from '@playwright/test';
import RegisterPage from '../pages/registerPage.js';
import LoginPage from '../pages/loginPage.js';

test.describe('Registration and login', () => {

test.describe.configure({ mode: 'serial' });
test.describe.configure({ workers: 1 });

    let user;

    test.beforeAll(() => {
        user = createUser();
    });

    test('The user can successfully register with valid personal data', async ({ page }) => {
        
        const registerPage = new RegisterPage(page);

        await registerPage.openRegisterPage();
        await registerPage.registerForm(user);
        
        await expect(registerPage.loginHeader).toBeVisible();
    })

    test('The user logs in with valid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.openLoginPage();
        await loginPage.loginForm(user);

        await expect(loginPage.pageTitle).toContainText('My account');
    } )
})

