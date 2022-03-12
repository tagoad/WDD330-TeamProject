import ProductData from "./productData"
const dataSource = new ProductData("tents")

import ProductList from "./productList"
const products = new ProductList("tents", dataSource, document.querySelector(".product-list"))
products.init()

