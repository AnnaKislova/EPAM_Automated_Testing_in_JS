class RegisterComponent {
    constructor(page) {
        this.page = page;
        this.firstNameField = page.locator('[data-test="first-name"]');
        this.lastNameField = page.locator('[data-test="last-name"]');
        this.dateOfBirthdayField = page.locator('[data-test="dob"]');
        this.streetField = page.locator('[data-test="street"]');
        this.postalCodeField = page.locator('[data-test="postal_code"]');
        this.cityField = page.locator('[data-test="city"]');
        this.stateField = page.locator('[data-test="state"]');
        this.countrySelect = page.locator('[data-test="country"]');
        this.phoneField = page.locator('[data-test="phone"]');
        this.emailField = page.locator('[data-test="email"]');
        this.passwordField = page.locator('[data-test="password"]');
        this.registerSubmitBtn = page.locator('[data-test="register-submit"]');
    }

    async fillRegisterForm(user) {
                
        await this.firstNameField.fill(user.firstName);
        await this.lastNameField.fill(user.lastName);
        await this.dateOfBirthdayField.fill(user.dateOfBirthday);
        await this.streetField.fill(user.street);
        await this.postalCodeField.fill(user.postalCode);
        await this.cityField.fill(user.city);
        await this.stateField.fill(user.state);
        await this.countrySelect.selectOption(user.country);
        await this.phoneField.fill(user.phone);
        await this.emailField.fill(user.email);
        await this.passwordField.fill(user.password);
        await this.registerSubmitBtn.click();

    }
}

export default RegisterComponent;
