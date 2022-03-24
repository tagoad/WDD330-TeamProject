import { loadHeaderFooter } from "./utils.js";
import CheckoutProcess from "./checkoutProcess.js";

const checkoutProcess = new CheckoutProcess(
  "so-cart",
  "#cart-totals",
  ".cart_summary",
  "#cart-item-template"
);
checkoutProcess.init();

loadHeaderFooter();
document
  .getElementById("submit-order-button")
  .addEventListener("click", (e) => {
    e.preventDefault();
    var myform = document.forms[0];
    var form_status = myform.checkValidity();
    myform.reportValidity();
    if (form_status) {
      checkoutProcess.checkout();
    }
  });
