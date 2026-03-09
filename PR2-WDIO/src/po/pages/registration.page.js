import RegistrationFormComponent from "../components/registrationForm.component";

class RegistrationPage {
    get registrationForm() {
        return new RegistrationFormComponent();
    }

    async openRegistrationPage() {
        await browser.url("https://practicesoftwaretesting.com/auth/register");
    }
}

export default RegistrationPage;
