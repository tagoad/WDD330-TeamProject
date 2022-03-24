import ExternalServices from "./externalServices.js";
import ProductList from "./productList.js";
import {
  loadHeaderFooter,
  getParams,
  capitalizeFirstLetter,
  addOrUpdateUrlParam,
} from "./utils.js";

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

document.querySelector("#sort-by").addEventListener("change", (e) => {
  const sortBy = e.target.value;
  addOrUpdateUrlParam("sortBy", sortBy);
  productList.renderList();
});
