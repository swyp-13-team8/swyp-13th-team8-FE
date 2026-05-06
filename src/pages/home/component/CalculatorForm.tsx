import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import CButton from '../../../components/common/CButton';
import CInput from '../../../components/common/CInput';
import CRadio from '../../../components/common/CRadio';
import { useState } from 'react';
import { MEDICAL_ITEMS, MEDICAL_PURPOSE, MEDICAL_TYPES, type MedicalItemsValue } from '../../../constants/insurance';
import { useUserStore } from '../../../store/useUserStore';
import { useModalStore } from '../../../store/useModalStore';
import { useNavigate } from 'react-router';
import { useCalcStore } from '../../../store/useCalcStore';
import { useAuthStore } from '../../../store/useAuthStore';
import CImg from '../../../components/common/CImg';

/**
 * 계산기
 *
 */
const CalculatorForm = () => {
  const [treatmentCategory, setTreatmentCategory] = useState<MedicalItemsValue | null>(null);
  const [purposeType, setPurposeType] = useState<string | null>(null);
  const [medicalCost, setMedicalCost] = useState<number | null>(null);
  const [visitType, setVisitType] = useState<string | null>(null);
  const [ediCode, setEdiCode] = useState<string>('');
  const { insuranceId, componyName, productName } = useCalcStore();
  const openModal = useModalStore((state) => state.openModal);
  const userInfo = useUserStore((state) => state.userInfo);
  const navigate = useNavigate();
  const setCalcInfo = useCalcStore((state) => state.setCalcInfo);

  const isLogin = !!useAuthStore((state) => state.accessToken);
  const goCalculator = () => {
    if (medicalCost && purposeType && visitType) {
      setCalcInfo({
        medicalCost: medicalCost,
        purposeType: purposeType,
        visitType: visitType,
        treatmentCategory: treatmentCategory,
        ediCode: ediCode,
      });
      navigate('/calculator');
    } else {
      alert('필수 항목을 채워주세요');
    }
  };
  return (
    <div className="w-190.5 h-111.5 rounded-3xl p-10 bg-gray-scale-0 relative">
      <span className="left-95 top-25 h-47.25 border border-gray-scale-10 absolute"></span>
      <div className="flex flex-row gap-23 mb-10">
        <div className="flex flex-col w-73.75 h-69.75 gap-8">
          <div>
            <p className="mb-3">
              보험 선택하기 <span className="text-red-600">*</span>
            </p>
            {insuranceId === 0 ? (
              <CButton
                disabled={!isLogin}
                onClick={() => openModal('INSURANCE')}
                className={`w-73.75 h-10.75 rounded-[10px] bg-primary-10  ${
                  !isLogin
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' // 비로그인 시 회색 처리
                    : 'bg-blue-100  cursor-pointer text-primary-50'
                }`}
                children="내 보험에서 불러오기"
              />
            ) : (
              <div className="w-73.75 h-10.75  px-3.5 rounded-[10px] bg-primary-5 flex flex-row">
                <CImg className="w-10 h-10" src="" alt="보험사" />
                <p className="gray-scale-60">{productName}</p>
              </div>
            )}
          </div>
          <div>
            <p className="mb-3">
              진료 유형 <span className="text-red-600">*</span>
            </p>
            {MEDICAL_TYPES.map((items) => (
              <CRadio
                disabled={!isLogin}
                key={items.value}
                label={items.label}
                name="medical_type"
                value={items.value}
                onClick={(e) => setVisitType(e.currentTarget.value)}
              />
            ))}
          </div>
          <div>
            <p className="mb-3">
              진료 항목 <span className="text-red-600">*</span>
            </p>
            <div className="mx-auto h-13 w-73.75">
              <Listbox disabled={!isLogin} value={treatmentCategory} onChange={setTreatmentCategory}>
                <ListboxButton className="w-full border rounded-[10px] border-gray-scale-30 text-left px-5 py-3 block cursor-pointer text-black focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25">
                  {treatmentCategory ?? '선택'}
                </ListboxButton>
                <ListboxOptions
                  anchor="bottom"
                  transition
                  className="w-(--button-width) border rounded-[10px] border-gray-scale-50 bg-white p-1 focus:outline-none transition duration-200 ease-in-out data-leave:data-closed:opacity-0 "
                >
                  {MEDICAL_ITEMS.map((items) => (
                    <ListboxOption
                      key={items.value}
                      value={items.value}
                      className="text-black flex cursor-default items-center gap-2 rounded-[10px] px-3 py-1.5 select-none data-focus:bg-gray-scale-20"
                    >
                      {items.label}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-73.75 h-69.75 gap-8">
          <div>
            <p className="mb-3">
              총 진료비 <span className="text-red-600">*</span>
            </p>
            <CInput disabled={!isLogin} onChange={(e) => setMedicalCost(parseInt(e.target.value))} className="h-11" placeholder="예) 1,000,000 원" />
          </div>
          <div>
            <p className="mb-3">
              진료 목적 <span className="text-red-600">*</span>
            </p>
            {MEDICAL_PURPOSE.map((items) => (
              <CRadio
                disabled={!isLogin}
                key={items.value}
                label={items.label}
                name="medical_purpose"
                value={items.value}
                onClick={(e) => setPurposeType(e.currentTarget.value)}
              />
            ))}
          </div>
          <div>
            <p className="mb-3">요양급여수가코드 (EDI)</p>
            <CInput disabled={!isLogin} onChange={(e) => setEdiCode(e.target.value)} className="h-11" placeholder="예) HE115 (어깨 MRI)" />
          </div>
        </div>
      </div>
      {userInfo.name !== '' ? (
        <CButton onClick={goCalculator} className="w-170.5 h-12.75 rounded-[10px] bg-primary-50 text-white" children="환급금 계산하기" />
      ) : (
        <CButton
          onClick={() => openModal('LOGIN')}
          className="w-170.5 h-12.75 rounded-[10px] bg-primary-50 text-gray-scale-0"
          children="로그인하고 환급금 계산하기"
        />
      )}
    </div>
  );
};

export default CalculatorForm;
