import { renderListWithTemplate } from "./utils";

export default class Alert {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  init() {
    // Read json from file
    fetch("../json/alerts.json")
      .then((response) => response.json())
      .then((alerts) => this.renderAlerts(alerts));
  }

  renderAlerts(alerts) {
    // create list element
    const listElement = document.createElement("section");
    renderListWithTemplate(
      "alert-card-template",
      listElement,
      alerts,
      this.renderTemplate
    );
    this.parentElement.prepend(listElement);
  }

  renderTemplate(template, alert) {
    // Set Title
    var title = template.querySelector(".alert-card__title");
    title.innerHTML = alert.title;
    // Set Message
    var message = template.querySelector(".alert-card__message");
    message.innerHTML = alert.message;
    // Set Background Color for Alert
    template.style.backgroundColor = alert.background;
    // Set Color for Alert
    template.style.color = alert.color;
    return template;
  }
}
