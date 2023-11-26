import axios from 'axios';
import queryString from 'query-string';

const ClientAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`,
    withCredentials: true,
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
