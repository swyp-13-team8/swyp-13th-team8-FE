export type HistoryTab = 'analysis' | 'calculator';

export interface HistoryLabel {
  text: string;
  variant: 'contract' | 'generation' | 'coverage' | 'caution' | 'unknown';
}

export interface AnalysisHistoryItem {
  id: number;
  analysisDate: string;
  insurer: string;
  contractType: string;
  policyName: string;
  policyCode: string;
  labels: HistoryLabel[];
  isSaved: boolean;
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
