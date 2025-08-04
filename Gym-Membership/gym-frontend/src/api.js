import axios from "axios";

const API = axios.create({
    baseURL : "https://127.0.0.1:8000/api/",
});

export default API;