import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('ogp_token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // TODO: refresh token logic; for now, sign out
      localStorage.removeItem('ogp_token');
    }
    return Promise.reject(error);
  },
);

export default instance;
