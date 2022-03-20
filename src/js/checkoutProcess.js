import { getLocalStorage, setLocalStorage, alertMessage } from "./utils";
import ExternalServices from "./externalServices";

export default class CheckoutProcess {
  constructor(key, totalSelector, itemSelector, templateSelector) {
    this.key = key;
    this.totalSelector = totalSelector;
    this.itemSelector = itemSelector;
    this.templateSelector = templateSelector;
    this.cart = {};
    this.subTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.total = 0;
  }

  init() {
    this.cart = getLocalStorage(this.key);
    this.calculateItemSummary();
    this.displayCart();
  }

  calculateItemSummary() {
    this.calculateOrderTotal();
    this.displayOrderTotals();
  }

  calculateOrderTotal() {
    this.subTotal = this.cart.listTotal;
    this.shipping =
      this.cart.items.length > 0 ? this.cart.items.length * 2 + 8 : 0;
    this.tax = this.cart.listTotal * 0.06;
    this.total = this.cart.listTotal + this.tax + this.shipping;
  }

  displayOrderTotals() {
    let totals = [];
    totals.push(`<h3>Subtotal: $${this.subTotal.toFixed(2)}</h3>`);
    totals.push(`<h3>Tax: $${this.tax.toFixed(2)}</h3>`);
    totals.push(`<h3>Shipping: $${this.shipping.toFixed(2)}</h3>`);
    totals.push(`<h3>Total: $${this.total.toFixed(2)}</h3>`);
    document.querySelector(this.totalSelector).innerHTML = "";
    totals.forEach((item) => {
      document.querySelector(this.totalSelector).innerHTML += item;
    });
  }

  packageItems(items) {
    let output = [];
    items.forEach((item) => {
      output.push({
        id: item.item.Id,
        name: item.item.Name,
        price: item.listPrice,
        quantity: item.qty,
      });
    });
    return output;
  }

  async checkout() {
    let form = document.querySelector("#checkout");
    let data = {
      orderDate: new Date(),
      fname: form.firstName.value,
      lname: form.lastName.value,
      street: form.street.value,
      city: form.city.value,
      state: form.state.value,
      zip: form.zip.value,
      cardNumber: form.cardNumber.value,
      expiration: form.expiration.value,
      code: form.cvv.value,
      items: this.packageItems(this.cart.items),
    };
    const externalServices = new ExternalServices();
    try {
      let response = await externalServices.checkout(data);
      var main = document.querySelector("main");
      main.innerHTML = `<div><h1>Thank you for your order!</h1><h2>Order ID: ${response.orderId}</h2><a href="/">Click here to return to the home page</a></div>`;
      this.clearCart();
    } catch (error) {
      // Loop through errorMessage.message object
      for (var key in error.message) {
        alertMessage(error.message[key]);
      }
    }
  }

  clearCart() {
    const cart = {
      items: [],
      suggestedTotal: 0,
      listTotal: 0,
    };
    setLocalStorage("so-cart", cart);
  }

  displayCart() {
    let htmlItems = [];
    if (this.cart.items) {
      htmlItems = this.cart.items.map((item) => this.renderCartItem(item));
    } else {
      htmlItems.push("<li class='cart-item'>No Items in Cart</li>");
    }
    document.querySelector(this.itemSelector).innerHTML = "";
    htmlItems.forEach((item) => {
      document.querySelector(this.itemSelector).appendChild(item);
    });
  }

  renderCartItem(entry) {
    var template = document.querySelector(this.templateSelector);
    var clone = template.content.firstElementChild.cloneNode(true);

    // Set Image
    var itemImage = clone
      .querySelector(".cart-card__image")
      .querySelector("img");
    itemImage.src = entry.item.Images.PrimarySmall;
    itemImage.alt = entry.item.Name;

    // Set Name
    var itemName = clone.querySelector(".card__name");
    itemName.innerHTML = entry.item.Name;

    // Set Attributes
    var itemColor = clone.querySelector(".cart-card__color");
    itemColor.innerHTML = entry.item.Colors[0].ColorName;
    var itemQty = clone.querySelector(".cart-card__quantity");
    itemQty.innerHTML = entry.qty;
    var itemPrice = clone.querySelector(".cart-card__price");
    itemPrice.innerHTML =
      entry.listPrice < entry.suggestedRetailPrice
        ? `<strike class="discount">$${entry.suggestedRetailPrice}</strike> $${entry.listPrice}`
        : `$${entry.listPrice}`;
    var discountFlag = clone.querySelector(".cart__discount");
    discountFlag.innerHTML = entry.discountPrice ? "On Sale!" : "";

    return clone;
  }
}
