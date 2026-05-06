import api from './axios';
import type { AnalysisHistoryItem } from '../type/historyTypes';

// 약관 분석 히스토리 조회 GET /history/analysis
export const getAnalysisHistory = async (page: number = 1): Promise<AnalysisHistoryItem[]> => {
  const response = await api.get('/history/analysis', { params: { page } });
  // 수빈님의 기존 로직: 데이터 배열을 바로 반환
  return response.data.data;
};

// 환급금 계산 히스토리 조회 GET /history/calculator
export const getCalculatorHistory = async (page: number = 1) => {
  const response = await api.get('/history/calculator', { params: { page } });
  return response.data.data;
};

// 약관 분석 히스토리 즐겨찾기 토글 PATCH /history/analysis/:id
export const toggleSaveAnalysisHistory = async (id: number) => {
  const response = await api.patch(`/history/analysis/${id}`);
  return response.data;
};

// 약관 분석 히스토리 삭제 DELETE /history/analysis/:id
export const deleteAnalysisHistory = async (id: number) => {
  const response = await api.delete(`/history/analysis/${id}`);
  return response.data;
};

// 환급금 계산 히스토리 즐겨찾기 토글 PATCH /history/calculator/:id
export const toggleSaveCalculatorHistory = async (id: number) => {
  const response = await api.patch(`/history/calculator/${id}`);
  return response.data;
};

// 환급금 계산 히스토리 삭제 DELETE /history/calculator/:id
export const deleteCalculatorHistory = async (id: number) => {
  const response = await api.delete(`/history/calculator/${id}`);
  return response.data;
};
