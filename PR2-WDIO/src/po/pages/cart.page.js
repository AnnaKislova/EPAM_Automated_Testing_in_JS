import cartItemComponent from "../components/cartItemComponent";

class CartPage {
    get cartItems() {
        return new cartItemComponent();
    }
}

export default CartPage;
