class CheckoutPage {
    get proceedBtnSecond() {
        return cy.get('[data-test="proceed-2"]');
    }

    get proceedBtnThird() {
        return cy.get('[data-test="proceed-3"]');
    }

    get paymentMethod() {
        return cy.get('[data-test="payment-method"]');
    }

    get bankName() {
        return cy.get('[data-test="bank_name"]');
    }

    get accountName() {
        return cy.get('[data-test="account_name"]');
    }

    get accountNumber() {
        return cy.get('[data-test="account_number"]');
    }

    get finishBtn() {
        return cy.get('[data-test="finish"]');
    }

    get paymentMessage() {
        return cy.get('[data-test="payment-success-message"]');
    }

    clickProceed() {
        this.proceedBtnSecond.click();
        this.proceedBtnThird.click();
    }

    fillBankForm(user) {
        this.paymentMethod.select('bank-transfer');
        this.bankName.type('UserBank');
        this.accountName.type(`${user.first_name} ${user.last_name}`);
        this.accountNumber.type("23456789");
        this.finishBtn.click();
        this.paymentMessage.should('contain.text', 'Payment was successful');
    }
    
}

export default CheckoutPage;




            
            
            
            
            

            