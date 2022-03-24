import admin from "./admin.js";
import { loadHeaderFooter } from "./utils.js";

const loginHandler = new admin("main");
loadHeaderFooter();
loginHandler.showLogin();
