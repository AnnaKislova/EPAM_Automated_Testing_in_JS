import RentalOptionsComponent from "../components/rentalOptions.component.js";

class RentalProductPage {

    get options() {
        return new RentalOptionsComponent();
    }

    
}

export default new RentalProductPage();
