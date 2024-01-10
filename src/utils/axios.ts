import { default as defaultAxios } from 'axios';

const axios = defaultAxios.create({
  baseURL: 'http://127.0.0.1:8282/api',
});

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error) || 'Something went wrong')
);

export default axios;
