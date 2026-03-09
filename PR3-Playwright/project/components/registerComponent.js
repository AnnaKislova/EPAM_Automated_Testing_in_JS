class RegisterComponent {
    constructor(page) {
        this.page = page;
    }

    get firstNameField() {
        return this.page.locator('[data-test="first-name"]');
    }

    get lastNameField() {
        return this.page.locator('[data-test="last-name"]');
    }

    get dateOfBirthdayField() {
        return this.page.locator('[data-test="dob"]');
    }

    get streetField() {
         return this.page.locator('[data-test="street"]');
    }

    get postalCodeField() {
        return this.page.locator('[data-test="postal_code"]');
    }

    get cityField() {
        return this.page.locator('[data-test="city"]');
    }

    get stateField() {
        return this.page.locator('[data-test="state"]');
    }

    get countrySelect() {
        return this.page.locator('[data-test="country"]');
    }

    get phoneField() {
        return this.page.locator('[data-test="phone"]');
    }

    get emailField() {
        return this.page.locator('[data-test="email"]');
    }

    get passwordField() {
        return this.page.locator('[data-test="password"]');
    }

    get registerSubmitBtn() {
        return this.page.locator('[data-test="register-submit"]');
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
