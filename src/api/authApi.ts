import type { TermsAgreeRequest } from '../pages/login/Terms';
import type { ApiResponse } from '../type/apiType';
import type { LoginResponse, RefreshTokenResponse, UserInfoResponse } from '../type/responseType';
import api from './axios';

export const loginAPI = async (accessToken: string) => {
  const data = await api.post<ApiResponse<LoginResponse>>('/auth/login', { kakaoToken: accessToken });
  return data.data;
};

export const userInfoAPI = async () => {
  const data = await api.get<ApiResponse<UserInfoResponse>>('/user/me');
  return data.data;
};

export const updateUserInfoAPI = async (name: string) => {
  const data = await api.patch<ApiResponse>('/user/me', { name });
  return data.data;
};

export const refreshTokenAPI = async (refreshToken: string | null) => {
  const data = await api.post<ApiResponse<RefreshTokenResponse>>('/auth/reissue', { refreshToken: refreshToken });
  return data.data;
};

export const termsAPI = async (requestData: TermsAgreeRequest) => {
  const data = await api.post<ApiResponse>('/auth/terms', requestData);
  return data.data;
};

export const logoutAPI = async (refreshToken: string | null) => {
  const data = await api.post<ApiResponse>('/auth/logout', { refreshToken: refreshToken });
  return data.data;
};
