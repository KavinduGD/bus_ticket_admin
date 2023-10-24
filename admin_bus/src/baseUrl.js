import axios from "axios";

const adminAxios = axios.create({
  baseURL: "https://admin-ticket-web.onrender.com",
});

export default adminAxios;
