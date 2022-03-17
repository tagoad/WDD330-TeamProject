import ExternalServices from "./externalServices.js";
import ProductDetails from "./productDetails.js";
import { getParams, loadHeaderFooter } from "./utils.js";

const datasource = new ExternalServices("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, datasource);
product.init();
loadHeaderFooter();
