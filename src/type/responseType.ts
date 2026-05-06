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

export interface HistoryResponse {
  analysisHistoryId: number;
  companyName: string;
  productName: string;
  contractType: string;
  generation: string;
  coverageStructure: string;
  cautionPoint: string;
  isFavorite: boolean;
  createdAt: Date;
}
export interface InsurancesResponse {
  userInsuranceId: number;
  companyName: string;
  productName: string;
  generation: number;
  joinDate: string;
}
