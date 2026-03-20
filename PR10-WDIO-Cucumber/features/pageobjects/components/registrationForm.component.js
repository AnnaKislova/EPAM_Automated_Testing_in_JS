class RegistrationFormComponent {
  get firstName() {
    return $('[data-test="first-name"]');
  }

  get lastName() {
    return $('[data-test="last-name"]');
  }

  get dateOfBirth() {
    return $('[data-test="dob"]');
  }

  get street() {
    return $('[data-test="street"]');
  }

  get postalCode() {
    return $('[data-test="postal_code"]');
  }

  get city() {
    return $('[data-test="city"]');
  }

  get state() {
    return $('[data-test="state"]');
  }

  get country() {
    return $('[data-test="country"]');
  }

  get phone() {
    return $('[data-test="phone"]');
  }

  get email() {
    return $('[data-test="email"]');
  }

  get password() {
    return $('[data-test="password"]');
  }

  get registerBtn() {
    return $('[data-test="register-submit"]');
  }

  async fillRegisterForm(user) {
    await this.firstName.setValue(user.firstName);
    await this.lastName.setValue(user.lastName);
    await this.dateOfBirth.setValue(user.dateOfBirthday);
    await this.street.setValue(user.street);
    await this.postalCode.setValue(user.postalCode);
    await this.city.setValue(user.city);
    await this.state.setValue(user.state);
    await this.country.selectByAttribute("value", user.country);
    await this.phone.setValue(user.phone);
    await this.email.setValue(user.email);
    await this.password.setValue(user.password);
    await this.registerBtn.click();
  }
}

export default RegistrationFormComponent;
