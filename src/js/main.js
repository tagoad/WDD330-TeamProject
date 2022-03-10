import ProductData from "./productData";
import ProductList from "./productList";
import { loadHeaderFooter } from "./utils";

const datasource = new ProductData("tents");
const productList = new ProductList(
  "tents",
  datasource,
  document.querySelector(".product-list")
);
productList.init();
loadHeaderFooter();
