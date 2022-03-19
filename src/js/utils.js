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
    console.log(renderedTemplate)
    parentElement.appendChild(renderedTemplate);
  });
}

export function loadHeaderFooter() {
  const header = document.getElementById("header");
  const footer = document.getElementById("footer");
  loadTemplate("../partials/header.html").then((template) =>
    renderWithTemplate(template, header)
  );
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

export function addOrUpdateUrlParam(name, value){
  const params = new URLSearchParams(window.location.search);
  params.set(name, value);
  window.history.replaceState({}, '', `?${params.toString()}`);
}
