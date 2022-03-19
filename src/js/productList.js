import { renderListWithTemplate } from "./utils";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
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
    var discounted = product.ListPrice < product.SuggestedRetailPrice
    // Set Link
    var link = template.querySelector("a");
    link.href += product.Id;
    // Set Image
    var image = template.querySelector("img");
    image.src = product.Images.PrimaryMedium;
    image.alt = product.Name;
    // Set Brand
    var brand = template.querySelector(".card__brand");
    brand.innerHTML = product.Brand.Name;
    // Set Name
    var name = template.querySelector(".card__name");
    name.innerHTML = product.NameWithoutBrand;
    // Set Price
    var price = template.querySelector(".product-card__price");
    price.innerHTML = discounted
      ? `<strike class="discount">$${product.SuggestedRetailPrice}</strike> $${product.ListPrice}`
      : `$${product.ListPrice}`;

    // Set Discount Flag
    var discountFlag = template.querySelector(".card__discount");
    discountFlag.innerHTML = discounted ? "On Sale!" : "";

    return template;
  }
}
