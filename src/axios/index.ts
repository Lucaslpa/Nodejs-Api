import axios from 'axios';

export const Axios = axios.create({
  baseURL: `http://localhost:${process.env.PORT || 2000}`,

  headers: { 'X-Custom-Header': '*' },
  validateStatus: () => true,
});
