import { getLocalStorage, setLocalStorage } from "./utils";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    this.product = await this.dataSource.findProductById(this.productId);
    await this.renderProductDetails();

    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    //Check if so-cart exists in local storage
    if (getLocalStorage("so-cart")) {
      const cart = getLocalStorage("so-cart");
      const index = cart.items.findIndex(
        (item) => item.item.Id === this.product.Id
      );
      if (index === -1) {
        cart.items.push({
          item: this.product,
          qty: 1,
          finalPrice: this.product.ListPrice,
        });
      } else {
        cart.items[index].qty++;
        cart.items[index].finalPrice =
          cart.items[index].qty * cart.items[index].item.ListPrice;
      }
      cart.total = cart.items.reduce((sum, item) => sum + item.finalPrice, 0);
      setLocalStorage("so-cart", cart);
    } else {
      const cart = {
        items: [
          {
            item: this.product,
            finalPrice: this.product.ListPrice,
            qty: 1,
          },
        ],
        total: this.product.ListPrice,
      };
      setLocalStorage("so-cart", cart);
    }
  }

  async renderProductDetails() {
    const details = `
            <h3 >${this.product.Brand.Id}</h3>
            <h2 class="divider">${this.product.NameWithoutBrand}</h2>
            <img
            class="divider"
            src="${this.product.Image}"
            alt="${this.product.NameWithoutBrand}"
            />

            <p class="product-card__price">$${this.product.ListPrice}</p>
            <p class="product__color">${this.product.Colors[0].ColorName}</p>
            <p class="product__description">
                ${this.product.DescriptionHtmlSimple}
            </p>
            <div class="product-detail__add">
            <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
            </div>
        `;
    // Add details to the page
    document.getElementById("product-details").innerHTML = details;
  }
}
