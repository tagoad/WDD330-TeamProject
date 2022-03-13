import ProductData from "./productData.js";
import ProductList from "./productList.js";
import { loadHeaderFooter } from "./utils.js";

const datasource = new ProductData("tents");
const productList = new ProductList(
  "tents",
  datasource,
  document.querySelector(".product-list")
);
productList.init();
loadHeaderFooter();
