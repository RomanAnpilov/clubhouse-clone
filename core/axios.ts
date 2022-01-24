import axios from "axios";
import Cookies from "js-cookie";
// import { parseCookies } from 'nookies';

// const cookies = parseCookies();
const Axios = axios.create({
  baseURL: "http://localhost:3002",
  headers: {
    Authorization: "Bearer " + Cookies.get("token"),
  },
});

export { Axios };
