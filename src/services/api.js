import axios from "axios";

const Api = axios.create({ baseURL: process.env.PROJECT_API });


export default Api;