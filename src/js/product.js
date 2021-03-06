import ExternalServices from "./externalServices";
import ProductDetails from "./productDetails";
import { getParams, loadHeaderFooter } from "./utils";

const datasource = new ExternalServices("tents");
const productId = getParams("product");

const product = new ProductDetails(productId, datasource);
product.init();
loadHeaderFooter();
