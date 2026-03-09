class AccountPage {
    get accountTitle() {
        return $('[data-test="page-title"]');
    }

    async getTitleText() {
        return await this.accountTitle.getText();     
    }
}
export default AccountPage;
