import { Before } from "@wdio/cucumber-framework";
import LoginPage from "../pageobjects/pages/login.page.js";
import { user } from "../../data/user.js";

const loginPage = new LoginPage();

Before({ tags: "@requiresLogin" }, async () => {
  await loginPage.openLoginPage();
  await loginPage.loginForm.fillLoginForm(user);
  await loginPage.loginForm.submit();
});
