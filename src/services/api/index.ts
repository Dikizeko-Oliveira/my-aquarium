import axios from "axios";

const environmentPRoduction = false;

const api = axios.create({
  baseURL: "http://localhost:3333/",
  headers: {
    ['Content-Type']: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
}
  // baseURL: environmentPRoduction ? process.env.GUITA_APP_API_PROD : process.env.GUITA_APP_DEV,
});

export default api;
