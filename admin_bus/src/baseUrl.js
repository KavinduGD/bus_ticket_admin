import axios from "axios";

const adminAxios = axios.create({
  baseURL: "http://localhost:3093",
});

export default adminAxios;
