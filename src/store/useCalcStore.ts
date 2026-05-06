import { create } from 'zustand';

interface CalcStore {
  insuranceId: number;
  medicalCost: number;
  visitType: string;
  treatmentCategory: string | null;
  purposeType: string;
  ediCode?: string;
  // 홈 화면 데이터 출력 이유
  componyName: string;
  productName: string;
  setHomeInsurance: (data: { componyName: string; productName: string }) => void;
  setInsuranceId: (num: number) => void;
  setCalcInfo: (data: { medicalCost: number; visitType: string; treatmentCategory: string | null; purposeType: string; ediCode?: string }) => void;
}

export const useCalcStore = create<CalcStore>((set) => ({
  insuranceId: 0,
  medicalCost: 0,
  visitType: '',
  treatmentCategory: null,
  purposeType: '',
  ediCode: '',
  componyName: '',
  productName: '',
  setHomeInsurance: (data) => {
    set({ componyName: data.componyName, productName: data.productName });
  },
  setInsuranceId: (num) => {
    set({ insuranceId: num });
  },
  setCalcInfo: (data) => {
    set({
      medicalCost: data.medicalCost,
      visitType: data.visitType,
      treatmentCategory: data.treatmentCategory,
      purposeType: data.purposeType,
      ediCode: data.ediCode,
    });
  },
}));
