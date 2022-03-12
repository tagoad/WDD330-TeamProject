import { renderListWithTemplate } from "./utils.js";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list.filter((product) => product.Transactable));
  }

  renderList(list) {
    renderListWithTemplate(
      "product-card-template",
      this.listElement,
      list,
      this.renderTemplate
    );
  }

  renderTemplate(template, product) {
    // Set Link
    var link = template.querySelector("a");
    link.href += product.Id;
    // Set Image
    var image = template.querySelector("img");
    image.src = product.Image;
    image.alt = product.Name;
    // Set Brand
    var brand = template.querySelector(".card__brand");
    brand.innerHTML = product.Brand.Name;
    // Set Name
    var name = template.querySelector(".card__name");
    name.innerHTML = product.NameWithoutBrand;
    // Set Price
    var price = template.querySelector(".product-card__price");
    price.innerHTML = product.DiscountPrice
      ? `<strike class="discount">$${product.ListPrice}</strike> $${product.DiscountPrice}`
      : `$${product.ListPrice}`;

    // Set Discount Flag
    var discountFlag = template.querySelector(".card__discount");
    discountFlag.innerHTML = product.DiscountPrice ? "On Sale!" : "";

    return template;
  }
}
