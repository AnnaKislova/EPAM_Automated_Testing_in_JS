import cartItemComponent from "../components/cartItem.component";

class CartPage {
  get cartItems() {
    return new cartItemComponent();
  }
}

export default CartPage;
