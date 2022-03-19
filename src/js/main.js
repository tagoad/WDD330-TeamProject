import { loadHeaderFooter } from "./utils";
import Alert from "./alert";

loadHeaderFooter();
const alert = new Alert(document.querySelector("main"));
alert.init();