import ProductData from "./productData";
import ProductList from "./productList";

const datasource = new ProductData("tents");
const productList = new ProductList("tents", datasource, document.querySelector(".product-list"));
productList.init();
