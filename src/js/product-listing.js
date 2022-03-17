import ExternalServices from "./externalServices";
import ProductList from "./productList";
import { loadHeaderFooter, getParams, capitalizeFirstLetter } from "./utils";

const category = getParams("category");
const datasource = new ExternalServices(category);
const productList = new ProductList(
  category,
  datasource,
  document.querySelector(".product-list")
);
productList.init();
loadHeaderFooter();

document.querySelector(
  ".product-list-title"
).innerHTML = `Top Products: ${capitalizeFirstLetter(category)}`;
