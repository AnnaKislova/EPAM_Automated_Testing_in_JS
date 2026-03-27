import RegisterComponent from '../components/registerComponent';

class RegisterPage {
  constructor(page) {
    this.page = page;
    this.registerForm = new RegisterComponent(page);
  }

  async openRegisterPage() {
    await this.page.goto('https://practicesoftwaretesting.com/auth/register');
  }
}

export default RegisterPage;
