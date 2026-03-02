import { createUser } from '../data/user.js';

export async function prepareUser() {
    const user = createUser();

    await browser.url("https://practicesoftwaretesting.com/auth/register");
    await $('[data-test="first-name"]').setValue('Irina');
    await $('[data-test="last-name"]').setValue('Kishinek');
    await $('[data-test="dob"]').setValue('1990-06-12');
    await $('[data-test="street"]').setValue('Ukmerges');
    await $('[data-test="postal_code"]').setValue("603000");
    await $('[data-test="city"]').setValue('Barselona');
    await $('[data-test="state"]').setValue('Mursia');
    await $('[data-test="country"]').selectByAttribute('value', 'ES');
    await $('[data-test="phone"]').setValue("34000665578");
    await $('[data-test="email"]').setValue(user.email);
    await $('[data-test="password"]').setValue(user.password);
    await $('[data-test="register-submit"]').click();

    const loginHeader = await $('h3=Login');
    await loginHeader.waitForDisplayed({ timeout: 10000 });

    await browser.url('https://practicesoftwaretesting.com/auth/login');
    await $('[data-test="email"]').setValue(user.email);
    await $('[data-test="password"]').setValue(user.password);
    await $('[data-test="login-submit"]').click();

    const title = await $('[data-test="page-title"]');
    await title.waitForDisplayed({ timeout: 10000 });

    return user;
}
