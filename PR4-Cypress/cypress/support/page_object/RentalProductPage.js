class RentalProductPage {
    
    get slider() {
        return cy.get('.ngx-slider-pointer-min');
    }
    get unitPrice() {
        return cy.get('[data-test="unit-price"]');
    }
    get totalPrice() {
        return cy.get('#total-price');
    }

    elementsCalculatorVisible() {
        this.slider.should('be.visible');
        this.unitPrice.should('be.visible');
        this.totalPrice.should('be.visible');
    };

    getUnitPrice() {
        return this.unitPrice.invoke('text')
        .then((text) => parseFloat(text));
    }
    moveSlider() {
        
        this.slider.invoke('attr', 'aria-valuetext')
            .should('eq', '1');

        this.slider.focus()
            .type('{rightarrow}{rightarrow}');

        this.slider.invoke('attr', 'aria-valuetext')
            .should('eq', '3');
    }

    verifyTotalPrice(unitPrice) {
            this.totalPrice.invoke('text')
        .then((text) => {
            expect(parseFloat(text)).to.be.closeTo(unitPrice * 3, 2)
        })
        }
    }


export default RentalProductPage;

