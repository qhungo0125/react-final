import axios from 'axios';
import queryString from 'query-string';

console.log(import.meta.env.VITE_API_URL);

const ClientAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true,
  // mode: 'no-cors',
  // headers: {"Access-Control-Allow-Origin": "*"}
  headers: {
    "Access-Control-Allow-Origin": "*",
    'content-type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params),
    // indexes: false
  },
});

ClientAxios.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

ClientAxios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    return error.response?.data;
  },
);

export default ClientAxios;
