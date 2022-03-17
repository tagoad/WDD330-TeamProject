import { getLocalStorage } from "./utils"

export default class CheckoutProcess {
    constructor(key, totalSelector, itemSelector, templateSelector) {
        this.key = key
        this.totalSelector = totalSelector
        this.itemSelector = itemSelector
        this.templateSelector = templateSelector
        this.cart = {}
        this.subTotal = 0
        this.shipping = 0
        this.tax = 0
        this.total = 0
    }

    init() {
        this.cart = getLocalStorage(this.key)
        this.calculateItemSummary()
        this.displayCart()
    }

    calculateItemSummary() {
        this.calculateOrderTotal()
        this.displayOrderTotals()
    }

    calculateOrderTotal() {
        this.subTotal = this.cart.total
        this.shipping = this.cart.items.length > 0 ? this.cart.items.length * 2 + 8 : 0
        this.tax = this.cart.total * 0.06
        this.total = this.cart.total + this.tax + this.shipping
    }

    displayOrderTotals() {
        let totals = []
        totals.push(`<h3>Subtotal: $${this.subTotal.toFixed(2)}</h3>`)
        totals.push( `<h3>Tax: $${this.tax.toFixed(2)}</h3>`)
        totals.push(`<h3>Shipping: $${this.shipping.toFixed(2)}</h3>`)
        totals.push(`<h3>Total: $${this.total.toFixed(2)}</h3>`)
        document.querySelector(this.totalSelector).innerHTML = "";
        totals.forEach((item) => {
            document.querySelector(this.totalSelector).innerHTML += item;
        })
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
        var itemImage = clone.querySelector(".cart-card__image").querySelector("img");
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
        itemPrice.innerHTML = entry.discountPrice
          ? `<strike class="discount">$${entry.finalPrice}</strike> $${entry.discountPrice}`
          : `$${entry.finalPrice}`;
        var discountFlag = clone.querySelector(".cart__discount");
        discountFlag.innerHTML = entry.discountPrice ? "On Sale!" : "";
      
        return clone;
      }
}