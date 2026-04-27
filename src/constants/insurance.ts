/**
 * 홈 기준 계산기 데이터
 * value 는 수정대상
 */

export const MEDICAL_TYPES = [
  { label: '외래', value: '외래' },
  { label: '입원', value: '입원' },
  { label: '약재', value: '약재' },
] as const;

export const MEDICAL_PURPOSE = [
  { label: '치료 목적', value: '치료 목적' },
  { label: '단순 검사', value: '단순 검사' },
  { label: '잘 모름', value: '잘 모름' },
] as const;

export const MEDICAL_ITEMS = [
  { label: 'MRI', value: 'MRI' },
  { label: 'CT', value: 'CT' },
  { label: '도수치료', value: '도수치료' },
  { label: '체외충격파', value: '체외충격파' },
  { label: '주사', value: '주사' },
  { label: '물리치료', value: '물리치료' },
  { label: '일반진료', value: '일반진료' },
] as const;

// 사용할 타입들 추출 (export 필수)
export type MedicalTypeValue = (typeof MEDICAL_TYPES)[number]['value'];
export type MedicalPurposeValue = (typeof MEDICAL_PURPOSE)[number]['value'];
export type MedicalItemsValue = (typeof MEDICAL_ITEMS)[number]['value'];
