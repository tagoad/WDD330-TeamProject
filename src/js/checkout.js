import { loadHeaderFooter } from "./utils";
import CheckoutProcess from "./checkoutProcess";

const checkoutProcess = new CheckoutProcess("so-cart", "#cart-totals", ".cart_summary", "#cart-item-template");
checkoutProcess.init();

loadHeaderFooter();
document
  .getElementById("submit-order-button")
  .addEventListener("click", (e) => {
    e.preventDefault();  
    checkoutProcess.checkout()
  });