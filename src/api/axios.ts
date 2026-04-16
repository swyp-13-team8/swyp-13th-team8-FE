import axios from 'axios';

// axios 기본 설정
const api = axios.create({
  // 추후 .env 파일로 옮길 예정
  baseURL: '/',
  headers: {
    'Content-Type': 'application-json',
  },
});

export default api;
