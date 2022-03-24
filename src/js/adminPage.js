import admin from './admin.js';
import { loadHeaderFooter } from './utils';

const loginHandler = new admin('main');
loadHeaderFooter();
loginHandler.showLogin();