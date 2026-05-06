export type HistoryTab = 'analysis' | 'calculator';

export interface HistoryLabel {
  text: string;
  variant: 'contract' | 'generation' | 'coverage' | 'caution' | 'unknown' | 'danger';
}

export interface AnalysisHistoryItem {
  analysisHistoryId: number;
  companyName: string;
  productName: string;
  contractType: string;
  generation: string;
  coverageStructure: string;
  cautionPoint: string;
  isFavorite: boolean;
  createdAt: string;
}

export interface CalculatorHistoryItem {
  id: number;
  savedAt: string;
  calculationItem: string;
  calculationCode: string;
  coverageCode: string;
  policyName: string;
  policyCode: string;
  insurer: string;
  joinDate: string;
  generation: number; // 추가
  expectedRefund: number;
  totalMedicalCost?: number;
  previousRefund?: number;
  isSaved: boolean;
}

export interface HistoryResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
}
