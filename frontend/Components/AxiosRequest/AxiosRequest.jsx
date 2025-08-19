// axiosInstance.js

import axios from 'axios';

const AxiosRequest = axios.create({
  // baseURL: 'https://api.demo.abmpakistan.org/'
  baseURL: 'https://abm-wbw0.onrender.com/'
});

export default AxiosRequest;

