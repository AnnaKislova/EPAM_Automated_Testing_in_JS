class LoginFormComponent {
  get emailField() {
    return $('[data-test="email"]');
  }

  get passwordField() {
    return $('[data-test="password"]');
  }

  get loginBtn() {
    return $('[data-test="login-submit"]');
  }

  async fillLoginForm(user) {
    await this.emailField.setValue(user.email);
    await this.passwordField.setValue(user.password);
  }

  async submit() {
    await this.loginBtn.click();
  }
}

export default LoginFormComponent;
