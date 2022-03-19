import { loadHeaderFooter } from "./utils";

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getCartContents() {
  let htmlItems = [];
  const cart = getLocalStorage("so-cart");
  if (cart.items) {
    htmlItems = cart.items.map((item) => renderCartItem(item));
  } else {
    htmlItems.push("<li class='cart-item'>No Items in Cart</li>");
  }
  document.querySelector(".product-list").innerHTML = "";
  htmlItems.forEach((item) => {
    document.querySelector(".product-list").appendChild(item);
  });
  if (cart.listTotal > 0) {
    document.querySelector(
      "#cart-total"
    ).innerHTML = `$${cart.listTotal.toFixed(2)}`;
  } else {
    document.querySelector("#cart-total").innerHTML = "";
  }

  // Requires having feather linked in cart html
  feather.replace();
}

function renderCartItem(entry) {
  var discounted = entry.listPrice < entry.suggestedRetailPrice;
  var template = document.querySelector("#cart-item-template");
  var clone = template.content.firstElementChild.cloneNode(true);
  // Set Image
  var itemImage = clone.querySelector(".cart-card__image").querySelector("img");
  itemImage.src = entry.item.Images.PrimaryMedium;
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
  itemPrice.innerHTML = discounted
    ? `<strike class="discount">$${entry.suggestedRetailPrice.toFixed(
        2
      )}</strike> $${entry.listPrice.toFixed(2)}`
    : `$${entry.listPrice.toFixed(2)}`;
  var itemRemove = clone.querySelector(".cart-card__remove");
  var discountFlag = clone.querySelector(".cart__discount");
  discountFlag.innerHTML = discounted ? "On Sale!" : "";

  itemRemove.addEventListener(
    "click",
    removeFromCart.bind(null, entry.item.Id)
  );
  var itemDecrement = clone.querySelector(".cart-card__subtract");
  itemDecrement.addEventListener(
    "click",
    decrementCart.bind(null, entry.item.Id)
  );
  var itemIncrement = clone.querySelector(".cart-card__add");
  itemIncrement.addEventListener(
    "click",
    incrementCart.bind(null, entry.item.Id)
  );
  return clone;
}

function removeFromCart(id) {
  const cart = getLocalStorage("so-cart");
  const index = cart.items.findIndex((item) => item.item.Id === id);
  cart.items.splice(index, 1);
  cart.suggestedTotal = cart.items.reduce(
    (sum, item) => sum + item.suggestedPrice,
    0
  );
  cart.listTotal = cart.items.reduce((sum, item) => sum + item.listPrice, 0);
  setLocalStorage("so-cart", cart);
  getCartContents();
}

function decrementCart(id) {
  const cart = getLocalStorage("so-cart");
  const index = cart.items.findIndex((item) => item.item.Id === id);
  cart.items[index].qty--;
  cart.items[index].suggestedRetailPrice =
    cart.items[index].qty * cart.items[index].item.SuggestedRetailPrice;
  cart.items[index].listPrice =
    cart.items[index].qty * cart.items[index].item.ListPrice;
  cart.suggestedTotal = cart.items.reduce(
    (sum, item) => sum + item.suggestedPrice,
    0
  );
  cart.listTotal = cart.items.reduce((sum, item) => sum + item.listPrice, 0);
  if (cart.items[index].qty === 0) {
    cart.items.splice(index, 1);
  }
  setLocalStorage("so-cart", cart);
  getCartContents();
}

function incrementCart(id) {
  const cart = getLocalStorage("so-cart");
  const index = cart.items.findIndex((item) => item.item.Id === id);
  cart.items[index].qty++;
  cart.items[index].suggestedRetailPrice =
    cart.items[index].qty * cart.items[index].item.SuggestedRetailPrice;
  cart.items[index].listPrice =
    cart.items[index].qty * cart.items[index].item.ListPrice;
  cart.suggestedTotal = cart.items.reduce(
    (sum, item) => sum + item.suggestedPrice,
    0
  );
  cart.listTotal = cart.items.reduce((sum, item) => sum + item.listPrice, 0);
  setLocalStorage("so-cart", cart);
  getCartContents();
}

function clearCart() {
  const cart = {
    items: [],
    suggestedTotal: 0,
    listTotal: 0,
  };
  setLocalStorage("so-cart", cart);
  getCartContents();
}

getCartContents();
loadHeaderFooter();
document
  .getElementById("clear-cart-button")
  .addEventListener("click", clearCart);
