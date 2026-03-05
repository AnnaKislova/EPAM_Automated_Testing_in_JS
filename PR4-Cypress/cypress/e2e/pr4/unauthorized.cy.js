
import RentalPage from "../../support/page_object/RentalPage";
import RentalProductPage from "../../support/page_object/RentalProductPage";
import HomePage from "../../support/page_object/HomePage";

describe('Unauthorized user actions', () => {
    it('Total price updates correctly for rental products', () => {
        const rentalPage = new RentalPage();
        rentalPage.open();
        rentalPage.getFirstProduct();

        const rentalProductPage = new RentalProductPage();
        
        rentalProductPage.elementsCalculatorVisible();
    
        rentalProductPage.getUnitPrice().then((unitPrice) => {
        rentalProductPage.moveSlider();
        rentalProductPage.verifyTotalPrice(unitPrice);

        });
    });

    it('Unauthorized user can change language', () => {
        const homePage = new HomePage();
        homePage.open();
        homePage.changeLanguage();
    })
});

