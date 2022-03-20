import { loadHeaderFooter } from "./utils.js";
import Alert from "./alert.js";

loadHeaderFooter();
const alert = new Alert(document.querySelector("main"));
alert.init();
