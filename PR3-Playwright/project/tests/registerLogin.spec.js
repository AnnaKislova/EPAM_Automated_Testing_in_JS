import { createUser } from '../data/userData.js';
import { test, expect } from '../fixtures/pages.fixture.js';

test.describe('Registration and login', () => {

test.describe.configure({ mode: 'serial' });
test.describe.configure({ workers: 1 });

    let user;

    test.beforeAll(() => {
        user = createUser();
    });

    test('The user can successfully register with valid personal data', async ({ registerPage, loginPage }) => {
        
        await registerPage.openRegisterPage();
        await registerPage.registerForm.fillRegisterForm(user);
        
        await expect(loginPage.loginForm.loginHeader).toBeVisible();
    });

    test('The user logs in with valid credentials', async ({ loginPage, profilePage }) => {

        await loginPage.openLoginPage();
        await loginPage.loginForm.fillLoginForm(user);

        await profilePage.profile.verifyProfileIsOpen();
    });
})

