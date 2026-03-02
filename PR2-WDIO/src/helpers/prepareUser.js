import { user } from '../data/user.js';

export async function prepareUser() {
    
    await browser.url('https://practicesoftwaretesting.com/auth/login');
    await $('[data-test="email"]').setValue(user.email);
    await $('[data-test="password"]').setValue(user.password);
    await $('[data-test="login-submit"]').click();

    const title = await $('[data-test="page-title"]');
    await title.waitForDisplayed({ timeout: 10000 });

return user;
}
