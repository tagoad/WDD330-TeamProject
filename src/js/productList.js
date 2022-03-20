import { renderListWithTemplate } from "./utils";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.list = [];
  }

  async init() {
    this.list = await this.dataSource.getData(this.category);
    this.renderList();
  }

  renderList() {
    // Sort list based on sortBy param
    const params = new URLSearchParams(window.location.search);
    const sortBy = params.get("sortBy");
    switch (sortBy) {
      case "name-desc":
        this.list.sort((a, b) =>
          b.NameWithoutBrand.localeCompare(a.NameWithoutBrand)
        );
        break;
      case "name-asc":
        this.list.sort((a, b) =>
          a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)
        );
        break;
      case "price-desc":
        this.list.sort((a, b) => b.ListPrice - a.ListPrice);
        break;
      case "price-asc":
        this.list.sort((a, b) => a.ListPrice - b.ListPrice);
        break;
      default:
        break;
    }
    this.listElement.innerHTML = "";
    renderListWithTemplate(
      "product-card-template",
      this.listElement,
      this.list,
      this.renderTemplate
    );
  }

  renderTemplate(template, product) {
    var discounted = product.ListPrice < product.SuggestedRetailPrice;
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
