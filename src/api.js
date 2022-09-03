import axios from 'axios';

const host = 'http://localhost:4000';
// const host = 'https://circul.herokuapp.com';

/**
 * Defines an axios instance
 */
const api = axios.create({
  baseURL: `${host}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
