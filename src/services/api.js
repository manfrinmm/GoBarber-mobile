import axios from "axios";

const a = ["http://192.168.0.101:3333", "https://front.devmatheus.com"];
const api = axios.create({
  baseURL: a[1]
});

export default api;
