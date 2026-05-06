import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { refreshTokenAPI } from './authApi';

// axios 기본 설정
const api = axios.create({
  // 추후 .env 파일로 옮길 예정
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const currentRefreshToken = useAuthStore.getState().refreshToken;

        const res = await refreshTokenAPI(currentRefreshToken);

        useAuthStore.getState().setRefreshToken(res.data.refreshToken);
        useAuthStore.getState().setAccessToken(res.data.accessToken);

        originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // 4. 리프레시 토큰도 만료되었거나 실패한 경우
        useAuthStore.getState().clearToken();
        alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
        window.location.href = '/home';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
