import axios from "axios";

class Request {
  constructor() {
    this.request = axios.create({
      baseURL: "https://634304f5ba4478d47846f6e5.mockapi.io",
    });
  }

  get = (url) => {
    return this.request.get(url);
  };
}

/*class Request {
  constructor() {
    this.request = axios.create({
      baseURL: "https://api.github.com",
    });
  }

  get = (url) => {
    return this.request.get(url);
  };

  post = (url, params) => {
    return this.request.post(url, params);
  };
}*/

export const request = new Request();
