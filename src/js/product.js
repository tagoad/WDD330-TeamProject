import ProductData from "./productData";
import ProductDetails from "./productDetails";
import { getParams } from "./utils";

const datasource = new ProductData("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, datasource);
product.init();