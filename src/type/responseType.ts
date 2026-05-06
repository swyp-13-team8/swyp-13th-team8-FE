export interface LoginResponse {
  accessToken: string;
  isNewUser: boolean;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserInfoResponse {
  userId: number;
  name: string;
  email: string;
  profileImageUrl: string;
}
