import ExternalServices from "./externalServices.js";
import ProductList from "./productList.js";
import { loadHeaderFooter } from "./utils.js";

const datasource = new ExternalServices("tents");
const productList = new ProductList(
  "tents",
  datasource,
  document.querySelector(".product-list")
);
productList.init();
loadHeaderFooter();
