import ProductData from "./productData.js";
import ProductDetails from "./productDetails.js";
import { getParams } from "./utils.js";

const datasource = new ProductData("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, datasource);
product.init();
