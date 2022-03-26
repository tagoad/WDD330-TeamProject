// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(param) {
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const productId = params.get(param);
  return productId;
}

export function renderListWithTemplate(
  templateId,
  parentElement,
  list,
  callback
) {
  const template = document.getElementById(templateId);
  list.forEach((item) => {
    const clone = template.content.firstElementChild.cloneNode(true);
    const renderedTemplate = callback(clone, item);
    parentElement.appendChild(renderedTemplate);
  });
}

export function loadHeaderFooter() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  loadTemplate("../partials/header.html")
    .then((template) => renderWithTemplate(template, header))
    .then(() => {
      const cart = getLocalStorage("so-cart");
      if (cart) {
        const cartCount = document.getElementById("cart_count");
        const cartQty = cart.items.reduce((sum, item) => sum + item.qty, 0);
        cartCount.innerHTML = cartQty;
      }
    });
  loadTemplate("../partials/footer.html").then((template) =>
    renderWithTemplate(template, footer)
  );
}

export async function loadTemplate(path) {
  const contents = await fetch(path).then((res) => res.text());
  const template = document.createElement("template");
  template.innerHTML = contents;
  return template;
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback = null
) {
  const clone = template.content.cloneNode(true);
  if (callback) {
    const renderedTemplate = callback(clone, data);
    parentElement.appendChild(renderedTemplate);
  } else {
    parentElement.appendChild(clone);
  }
}

// https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function addOrUpdateUrlParam(name, value) {
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.history.replaceState({}, "", `?${params.toString()}`);
}

export function alertMessage(message, alertType = "alert", scroll = true) {
  // create element to hold our alert
  const alert = document.createElement("div");
  alert.classList.add("alert_message", alertType);
  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `<p>${message}</p><p class="close">X</p>`;

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", function (e) {
    if (e.target.innerText == "X") {
      // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this);
    }
  });
  // add the alert to the top of main
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);
}
