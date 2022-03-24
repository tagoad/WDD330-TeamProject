const baseURL = "http://157.201.228.93:2992/";

function convertToJson(res) {
  return res.json().then((data) => {
    if (res.ok) {
      return data;
    } else {
      throw { name: "servicesError", message: data };
    }
  });
}

export default class ExternalServices {
  constructor() {}

  getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  async findProductById(id) {
    return fetch(baseURL + `product/${id}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  async checkout(order) {
    return fetch(baseURL + "checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }).then(convertToJson);
  }

  async loginRequest(email, password) {
    const response = await fetch(baseURL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then(convertToJson);
    return response.accessToken;
  }

  async getOrders(token) {
    return fetch(baseURL + "orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(convertToJson);
  }
}
