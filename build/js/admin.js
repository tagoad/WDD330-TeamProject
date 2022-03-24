import ExternalServices from "./externalServices.js";
import { alertMessage, renderListWithTemplate } from "./utils.js";

export default class {
  constructor(parentElement) {
    this.parentElement = document.querySelector(parentElement);
    this.token = null;
    this.services = new ExternalServices();
  }

  async login(next = null) {
    // Get form data
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    // Send login request
    try {
      this.token = await this.services.loginRequest(
        email.value,
        password.value
      );
      if (next) {
        next();
      }
      email.value = "";
      password.value = "";
    } catch (e) {
      alertMessage(e.message, "alert");
    }
  }

  showLogin() {
    // Create Login form
    let loginForm = document.createElement("form");
    loginForm.id = "login";
    loginForm.className = "login";
    loginForm.innerHTML = `
            <div class="login-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Email">
            </div>
            <div class="login-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password">
            </div>
            <div class="login-group">
                <button type="submit" class="button">Login</button>
            </div>
        `;
    // Add submit function
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.login(this.getOrders.bind(this));
    });
    // Add form to body
    this.parentElement.appendChild(loginForm);
  }

  async getOrders() {
    // Get orders
    try {
      let orders = await this.services.getOrders(this.token);
      // Render orders
      this.renderOrders(orders);
    } catch (e) {
      alertMessage(e.message, "alert");
    }
  }

  renderOrders(orders) {
    // Clear parent element
    this.parentElement.innerHTML = "<h2>Orders:</h2><div id='orders'></div>";
    renderListWithTemplate(
      "order-card-template",
      document.querySelector("#orders"),
      orders,
      this.renderTemplate.bind(this)
    );
  }

  renderTemplate(template, order) {
    template.querySelector(
      ".order-card-title"
    ).innerHTML = `Order #${order.id}`;
    template.querySelector(".order-card-date").innerHTML = new Date(
      order.orderDate
    ).toLocaleDateString();

    template.querySelector(
      ".order-card-name"
    ).innerHTML = `${order.fname} ${order.lname}`;
    template.querySelector(
      ".order-card-address"
    ).innerHTML = `${order.street}, ${order.city}, ${order.state} ${order.zip}`;
    for (let item of order.items) {
      let newItem = this.renderItem(item);
      template.querySelector(".order-card-items").innerHTML += newItem;
    }
    template.querySelector(
      ".order-card-total"
    ).innerHTML = `$${order.orderTotal}`;
    return template;
  }

  renderItem(item) {
    return `
            <div class="order-card-item">
                <div class="order-card-item-sku">${item.id}</div>
                <div class="order-card-item-quantity">${item.quantity}</div>
                <div class="order-card-item-price">$${item.price}</div>
            </div>`;
  }
}
