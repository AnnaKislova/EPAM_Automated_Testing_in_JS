class ProfilePage {
    get currentPasswordField() {
    return $('[data-test="current-password"]');
    }

    get newPasswordField() {
    return $('[data-test="new-password"]');
    }

    get confirmPasswordField() {
        return $('[data-test="new-password-confirm"]');
    }

    get form() {
        return $("form");
    }

    get submitBtn() {
        return $('[data-test="change-password-submit"]');
    }

    async openProfilePage() {
        await browser.url("https://practicesoftwaretesting.com/account/profile");
    }

    async fillCurrentPassword(password) {
        await this.currentPasswordField.setValue(password);
        await browser.keys("Tab");
    }

    async waitForCurrentPasswordValid() {
        await browser.waitUntil(
            async () => !(await this.currentPasswordField.getAttribute("class")).includes("ng-pending"),
            { timeout: 7000, timeoutMsg: "Async validation did not finish" }
        );
        
        await browser.waitUntil(
            async () => (await this.currentPasswordField.getAttribute("class")).includes("ng-valid"),
            { timeout: 5000, timeoutMsg: "Current password did not become valid" }
        );
    }

    async fillNewPassword(newPassword) {
        await this.newPasswordField.setValue(newPassword);
        await browser.keys("Tab");
    }

    async fillConfirmPassword(newPassword) {
        await this.confirmPasswordField.setValue(newPassword);
        await browser.keys("Tab");
    }

    async waitForFormValid() {
        await browser.waitUntil(
            async () => (await this.form.getAttribute("class")).includes("ng-valid"),
            { timeout: 5000, timeoutMsg: "Form did not become valid" }
        );
    }

    async clickSubmit() {
        await this.submitBtn.scrollIntoView();
        await this.submitBtn.click(); 
    }

    async waitForRedirectToLogin() {
    await browser.waitUntil(
        async () => (await browser.getUrl()).includes("/login"),
        { timeout: 10000, timeoutMsg: "Expected redirect to /login after password change" }
    );
}

}

export default ProfilePage;
